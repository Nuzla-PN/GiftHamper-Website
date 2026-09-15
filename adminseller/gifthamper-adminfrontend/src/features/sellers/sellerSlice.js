import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../lib/axios';

export const fetchSellers = createAsyncThunk(
  'sellers/fetchSellers',
  async ({ page = 1, limit = 20 } = {}, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/sellers?page=${page}&limit=${limit}`);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch sellers');
    }
  }
);

export const toggleSellerActive = createAsyncThunk(
  'sellers/toggleSellerActive',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/sellers/${id}/toggle-active`);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to toggle seller status');
    }
  }
);

const sellerSlice = createSlice({
  name: 'sellers',
  initialState: {
    items: [],
    pagination: {},
    loading: false,
    error: null,
  },
  reducers: {
    clearSellerError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.sellers || action.payload || [];
        state.pagination = action.payload.pagination || {};
      })
      .addCase(fetchSellers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(toggleSellerActive.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.items.findIndex((s) => s._id === updated._id);
        if (index !== -1) {
          state.items[index] = updated;
        }
      });
  },
});

export const { clearSellerError } = sellerSlice.actions;
export default sellerSlice.reducer;
