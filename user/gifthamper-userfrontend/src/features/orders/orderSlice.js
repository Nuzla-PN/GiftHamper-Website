import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders:  [
  {
    id: "ORD-2025-00142",
    placedOn: "2025-04-08T10:30:00",
    deliveredOn: "2025-04-11T14:22:00",
    status: "delivered",
    paymentMethod: "UPI",
    paymentStatus: "Paid",
    address: {
      name: "Rahul Sharma",
      line1: "42, MG Road",
      city: "Kozhikode",
      state: "Kerala",
      pin: "673001",
      phone: "+91 98765 43210",
    },
    items: [
      {
        id: "p001",
        title: "Luxury Rose & Chocolate Hamper",
        image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=200&q=80",
        price: 1299,
        originalPrice: 1799,
        qty: 1,
        sellerName: "Aroha Gifts",
        subCategory: "Chocolate Hamper",
        review: null,
      },
      {
        id: "p002",
        title: "Artisan Tea Collection Box",
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=200&q=80",
        price: 849,
        qty: 1,
        sellerName: "Festive Trunk",
        subCategory: "Coffee & Tea",
        review: { rating: 4, text: "Absolutely loved the tea varieties. Great packaging!" },
      },
    ],
    subtotal: 2148,
    discount: 150,
    delivery: 0,
    total: 1998,
    trackingId: "BLUE9875432001IN",
    courier: "Bluedart",
    timeline: [
      { status: "placed",           time: "2025-04-08T10:30:00", note: "Your order has been placed" },
      { status: "confirmed",        time: "2025-04-08T12:00:00", note: "Seller confirmed your order" },
      { status: "shipped",          time: "2025-04-09T09:15:00", note: "Picked up by Bluedart" },
      { status: "out_for_delivery", time: "2025-04-11T07:45:00", note: "Out for delivery in your area" },
      { status: "delivered",        time: "2025-04-11T14:22:00", note: "Delivered to Rahul Sharma" },
    ],
  },
  {
    id: "ORD-2025-00098",
    placedOn: "2025-03-22T16:10:00",
    status: "shipped",
    paymentMethod: "Credit Card",
    paymentStatus: "Paid",
    address: {
      name: "Rahul Sharma",
      line1: "42, MG Road",
      city: "Kozhikode",
      state: "Kerala",
      pin: "673001",
      phone: "+91 98765 43210",
    },
    items: [
      {
        id: "p003",
        title: "Spa & Wellness Gift Set",
        image: "https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=200&q=80",
        price: 3199,
        originalPrice: 3999,
        qty: 1,
        sellerName: "Bliss & Co.",
        subCategory: "Wellness",
        review: null,
      },
    ],
    subtotal: 3199,
    discount: 200,
    delivery: 0,
    total: 2999,
    trackingId: "DTDC20250322KK",
    courier: "DTDC",
    estimatedDelivery: "2025-04-14",
    timeline: [
      { status: "placed",    time: "2025-03-22T16:10:00", note: "Order placed successfully" },
      { status: "confirmed", time: "2025-03-22T18:30:00", note: "Confirmed by Bliss & Co." },
      { status: "shipped",   time: "2025-03-24T10:00:00", note: "Shipped via DTDC" },
    ],
  },
  {
    id: "ORD-2025-00067",
    placedOn: "2025-02-14T09:00:00",
    deliveredOn: "2025-02-17T11:30:00",
    status: "returned",
    paymentMethod: "Net Banking",
    paymentStatus: "Refunded",
    address: {
      name: "Rahul Sharma",
      line1: "42, MG Road",
      city: "Kozhikode",
      state: "Kerala",
      pin: "673001",
      phone: "+91 98765 43210",
    },
    items: [
      {
        id: "p004",
        title: "Valentine's Special Hamper",
        image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=200&q=80",
        price: 2499,
        qty: 1,
        sellerName: "Aroha Gifts",
        subCategory: "Occasion",
        review: { rating: 2, text: "Box was damaged on arrival. Return process was smooth though." },
      },
    ],
    subtotal: 2499,
    discount: 0,
    delivery: 49,
    total: 2548,
    trackingId: "EKART9821KK01",
    courier: "Ekart",
    refundAmount: 2548,
    refundDate: "2025-02-20",
    timeline: [
      { status: "placed",          time: "2025-02-14T09:00:00", note: "Order placed" },
      { status: "confirmed",       time: "2025-02-14T10:15:00", note: "Confirmed" },
      { status: "shipped",         time: "2025-02-15T08:00:00", note: "Shipped" },
      { status: "delivered",       time: "2025-02-17T11:30:00", note: "Delivered" },
      { status: "return_requested",time: "2025-02-17T13:00:00", note: "Return initiated — damaged item" },
      { status: "returned",        time: "2025-02-20T10:00:00", note: "Refund of ₹2,548 processed" },
    ],
  },
  {
    id: "ORD-2025-00031",
    placedOn: "2025-01-05T14:20:00",
    status: "cancelled",
    paymentMethod: "COD",
    paymentStatus: "Not Charged",
    address: {
      name: "Rahul Sharma",
      line1: "42, MG Road",
      city: "Kozhikode",
      state: "Kerala",
      pin: "673001",
      phone: "+91 98765 43210",
    },
    items: [
      {
        id: "p005",
        title: "Corporate Gift Hamper — Premium",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&q=80",
        price: 5999,
        qty: 3,
        sellerName: "Yuvan Hampers",
        subCategory: "Corporate Gifts",
        review: null,
      },
    ],
    subtotal: 17997,
    discount: 1000,
    delivery: 0,
    total: 16997,
    cancelReason: "Out of stock — seller cancelled",
    timeline: [
      { status: "placed",    time: "2025-01-05T14:20:00", note: "Order placed" },
      { status: "cancelled", time: "2025-01-05T18:00:00", note: "Cancelled: item went out of stock" },
    ],
  },
],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    placeOrder: (state, action) => {
      state.orders.unshift(action.payload);
    },

    cancelOrder: (state, action) => {
      const order = state.orders.find(o => o.id === action.payload);
      if (order) order.status = "cancelled";
    },

    updateOrderStatus: (state, action) => {
      const { id, status } = action.payload;
      const order = state.orders.find(o => o.id === id);
      if (order) order.status = status;
    },
  },
});

export const { placeOrder, cancelOrder, updateOrderStatus } = orderSlice.actions;

export const selectOrders = (state) => state.orders.orders;

export default orderSlice.reducer;