import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../lib/axios';

export const fetchSellerOrders = createAsyncThunk(
  'orders/fetchSellerOrders',
  async ({ page = 1, limit = 20 } = {}, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/orders?page=${page}&limit=${limit}`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch orders');
    }
  }
);

export const updateItemStatus = createAsyncThunk(
  'orders/updateItemStatus',
  async ({ orderId, itemId, status }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/orders/${orderId}/items/${itemId}/status`, { status });
      return { orderId, itemId, status, updatedOrder: data.data };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update status');
    }
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    items: [],
    pagination: {},
    loading: false,
    error: null,
  },
  reducers: {
    clearOrderError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerOrders.fulfilled, (state, action) => {
        state.loading = false;
        const res = action.payload;
        state.items = res.data?.orders || res.orders || res.data || [];
        state.pagination = {
          page: res.data?.page || res.page || 1,
          totalPages: res.data?.pages || res.pages || 1,
          total: res.data?.total || res.total || 0,
        };
      })
      .addCase(fetchSellerOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateItemStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateItemStatus.fulfilled, (state, action) => {
        state.loading = false;
        const { orderId, itemId, status } = action.payload;
        const order = state.items.find((o) => o._id === orderId);
        if (order) {
          const item = order.items.find((i) => i._id === itemId);
          if (item) {
            item.status = status;
          }
        }
      })
      .addCase(updateItemStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrderError } = orderSlice.actions;
export default orderSlice.reducer;
