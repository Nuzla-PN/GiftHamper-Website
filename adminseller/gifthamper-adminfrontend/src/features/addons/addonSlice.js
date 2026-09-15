import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../lib/axios';

export const fetchGiftBoxes = createAsyncThunk(
  'addons/fetchGiftBoxes',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/gift-boxes');
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch gift boxes');
    }
  }
);

export const createGiftBox = createAsyncThunk(
  'addons/createGiftBox',
  async (giftBoxData, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/gift-boxes', giftBoxData);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create gift box');
    }
  }
);

export const updateGiftBox = createAsyncThunk(
  'addons/updateGiftBox',
  async ({ id, ...giftBoxData }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/gift-boxes/${id}`, giftBoxData);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update gift box');
    }
  }
);

export const deleteGiftBox = createAsyncThunk(
  'addons/deleteGiftBox',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/gift-boxes/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete gift box');
    }
  }
);

export const fetchWrappings = createAsyncThunk(
  'addons/fetchWrappings',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/wrappings');
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch wrappings');
    }
  }
);

export const createWrapping = createAsyncThunk(
  'addons/createWrapping',
  async (wrappingData, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/wrappings', wrappingData);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create wrapping');
    }
  }
);

export const updateWrapping = createAsyncThunk(
  'addons/updateWrapping',
  async ({ id, ...wrappingData }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/wrappings/${id}`, wrappingData);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update wrapping');
    }
  }
);

export const deleteWrapping = createAsyncThunk(
  'addons/deleteWrapping',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/wrappings/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete wrapping');
    }
  }
);

export const fetchGreetingCards = createAsyncThunk(
  'addons/fetchGreetingCards',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/greeting-cards');
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch greeting cards');
    }
  }
);

export const createGreetingCard = createAsyncThunk(
  'addons/createGreetingCard',
  async (cardData, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/greeting-cards', cardData);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create greeting card');
    }
  }
);

export const updateGreetingCard = createAsyncThunk(
  'addons/updateGreetingCard',
  async ({ id, ...cardData }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/greeting-cards/${id}`, cardData);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update greeting card');
    }
  }
);

export const deleteGreetingCard = createAsyncThunk(
  'addons/deleteGreetingCard',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/greeting-cards/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete greeting card');
    }
  }
);

const addonSlice = createSlice({
  name: 'addons',
  initialState: {
    giftBoxes: [],
    wrappings: [],
    greetingCards: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearAddonError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGiftBoxes.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchGiftBoxes.fulfilled, (state, action) => {
        state.loading = false;
        state.giftBoxes = action.payload.giftBoxes || action.payload || [];
      })
      .addCase(fetchGiftBoxes.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(createGiftBox.fulfilled, (state, action) => { state.giftBoxes.push(action.payload); })
      .addCase(updateGiftBox.fulfilled, (state, action) => {
        const i = state.giftBoxes.findIndex((g) => g._id === action.payload._id);
        if (i !== -1) state.giftBoxes[i] = action.payload;
      })
      .addCase(deleteGiftBox.fulfilled, (state, action) => {
        state.giftBoxes = state.giftBoxes.filter((g) => g._id !== action.payload);
      })

      .addCase(fetchWrappings.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchWrappings.fulfilled, (state, action) => {
        state.loading = false;
        state.wrappings = action.payload.wrappings || action.payload || [];
      })
      .addCase(fetchWrappings.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(createWrapping.fulfilled, (state, action) => { state.wrappings.push(action.payload); })
      .addCase(updateWrapping.fulfilled, (state, action) => {
        const i = state.wrappings.findIndex((w) => w._id === action.payload._id);
        if (i !== -1) state.wrappings[i] = action.payload;
      })
      .addCase(deleteWrapping.fulfilled, (state, action) => {
        state.wrappings = state.wrappings.filter((w) => w._id !== action.payload);
      })

      .addCase(fetchGreetingCards.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchGreetingCards.fulfilled, (state, action) => {
        state.loading = false;
        state.greetingCards = action.payload.greetingCards || action.payload || [];
      })
      .addCase(fetchGreetingCards.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(createGreetingCard.fulfilled, (state, action) => { state.greetingCards.push(action.payload); })
      .addCase(updateGreetingCard.fulfilled, (state, action) => {
        const i = state.greetingCards.findIndex((c) => c._id === action.payload._id);
        if (i !== -1) state.greetingCards[i] = action.payload;
      })
      .addCase(deleteGreetingCard.fulfilled, (state, action) => {
        state.greetingCards = state.greetingCards.filter((c) => c._id !== action.payload);
      });
  },
});

export const { clearAddonError } = addonSlice.actions;
export default addonSlice.reducer;
