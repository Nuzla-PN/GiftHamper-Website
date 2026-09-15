import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../lib/axios';

export const loginSeller = createAsyncThunk(
  'auth/loginSeller',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/login', { email, password });
      if (typeof window !== 'undefined') {
        localStorage.setItem('sellerToken', data.data.token);
        localStorage.setItem('sellerInfo', JSON.stringify(data.data.seller));
      }
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);

export const registerSeller = createAsyncThunk(
  'auth/registerSeller',
  async ({ name, email, password, description }, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/register', { name, email, password, description });
      if (typeof window !== 'undefined') {
        localStorage.setItem('sellerToken', data.data.token);
        localStorage.setItem('sellerInfo', JSON.stringify(data.data.seller));
      }
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Registration failed');
    }
  }
);

export const getProfile = createAsyncThunk(
  'auth/getProfile',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/profile');
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch profile');
    }
  }
);

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const { data } = await api.put('/profile', profileData);
      if (typeof window !== 'undefined') {
        localStorage.setItem('sellerInfo', JSON.stringify(data.data));
      }
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update profile');
    }
  }
);

const getInitialAuth = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('sellerToken');
    const seller = localStorage.getItem('sellerInfo');
    return {
      token: token || null,
      seller: seller ? JSON.parse(seller) : null,
    };
  }
  return { token: null, seller: null };
};

const initialAuth = getInitialAuth();

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    seller: initialAuth.seller,
    token: initialAuth.token,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.seller = null;
      state.token = null;
      state.error = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('sellerToken');
        localStorage.removeItem('sellerInfo');
      }
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginSeller.fulfilled, (state, action) => {
        state.loading = false;
        state.seller = action.payload.seller;
        state.token = action.payload.token;
      })
      .addCase(loginSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerSeller.fulfilled, (state, action) => {
        state.loading = false;
        state.seller = action.payload.seller;
        state.token = action.payload.token;
      })
      .addCase(registerSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.seller = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.seller = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
