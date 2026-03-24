import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [
    {
      id: "1",
      title: "Chocolate Delight Hamper",
      sellerName: "Sweet Treats",
 image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400",
      price: 2000,
      rating: 4.5,
      reviews: 120,
      mainCategory: "Occasion",
      subCategory: "Birthday",
    },
    {
      id: "2",
      title: "Luxury Gift Box",
      sellerName: "Gift Studio",
      image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=400",
      price: 3500,
      rating: 4.2,
      reviews: 80,
      mainCategory: "Recipient",
      subCategory: "Her",
    },
    {
      id: "3",
      title: "Festival Hamper",
      sellerName: "seller shop name",
      image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=400",
      price: 1800,
      rating: 4,
      reviews: 60,
      mainCategory: "Festival",
      subCategory: "Diwali",
    },
    {
      id: "4",
      title: "Festival Hamper",
      sellerName: "seller shop name",
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400",
      price: 1800,
      rating: 4,
      reviews: 60,
      mainCategory: "Festival",
      subCategory: "Diwali",
    },
    {
      id: "5",
      title: "Festival Hamper",
      sellerName: "seller shop name",
      image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=400",
      price: 1800,
      rating: 4,
      reviews: 60,
      mainCategory: "Festival",
      subCategory: "Diwali",
    },
    {
      id: "6",
      title: "Festival Hamper",
      sellerName: "seller shop name",
      image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=400",
      price: 1800,
      rating: 4,
      reviews: 60,
      mainCategory: "Festival",
      subCategory: "Diwali",
    },
    {
      id: "7",
      title: "Festival Hamper",
      sellerName: "seller shop name",
      image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=400",
      price: 1800,
      rating: 4,
      reviews: 60,
      mainCategory: "Festival",
      subCategory: "Handmade",
    },
    {
      id: "8",
      title: "Festival Hamper",
      sellerName: "seller shop name",
      image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=400",
      price: 1800,
      rating: 4,
      reviews: 60,
      mainCategory: "Festival",
      subCategory: "New Year",
    },
  ],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // later you can add filters here
  },
});

export default productSlice.reducer;