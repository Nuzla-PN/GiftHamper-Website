import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [
    {
      id: "1",
      title: "Chocolate Delight Hamper",
      sellerName: "Sweet Treats",
      sellerRating: 4.7,
      sellerReviews: 210,

      stock: 10,

      image: ["https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400",
              "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400",
              "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=400",
              ],
      price: 2000,
      originalPrice: 2500,

      rating: 4,
      reviews: 120,
      reviewsData: [
          {
            id: 1,
            name: "Anjali",
            rating: 5,
            title: "Amazing Gift!",
            comment: "Beautiful packaging and great quality products.",
            date: "2 days ago",
          },
          {
            id: 2,
            name: "Rahul",
            rating: 4,
            title: "Worth it",
            comment: "Good hamper, delivery was fast.",
            date: "1 week ago",
          },
        ],

      description:
        "A delightful chocolate hamper filled with premium chocolates, perfect for gifting on birthdays and special occasions.",

      features: [
        "Premium imported chocolates",
        "Beautiful gift packaging",
        "Custom message card included",
      ],

      tags: ["Chocolate", "Birthday", "Gift Hamper"],

      mainCategory: "Occasion",
      subCategory: "Birthday",
      isFeatured: true,
    },
    {
      id: "2",
      title: "Luxury Gift Box",
      sellerName: "Gift Studio",
      image: ["https://images.unsplash.com/photo-1607082349566-187342175e2f?w=400"],
      price: 3500,
      rating: 4.2,
      reviews: 80,
      mainCategory: "Recipient",
      subCategory: "For Her",
      isFeatured: true,
    },
    {
      id: "3",
      title: "Watch Hamper",
      sellerName: "seller shop name",
      image: ["https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=400"],
      price: 1800,
      rating: 4,
      reviews: 60,
      mainCategory: "Recipient",
      subCategory: "for Him",
       isFeatured: true,
    },
    {
      id: "4",
      title: "Festival Hamperd",
      sellerName: "seller shop name",
      image: ["https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400"],
      price: 1800,
      rating: 4,
      reviews: 60,
      mainCategory: "Festival",
      subCategory: "Diwali",
       isFeatured: true,
    },
    {
      id: "5",
      title: "Festival Hamperd",
      sellerName: "seller shop name",
      image: ["https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=400"],
      price: 1800,
      rating: 4,
      reviews: 60,
      mainCategory: "Festival",
      subCategory: "Diwali",
       isFeatured: true,
    },
    {
      id: "6",
      title: "Festival Hamperd",
      sellerName: "seller shop name",
      image: ["https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=400"],
      price: 1800,
      rating: 4,
      reviews: 60,
      mainCategory: "Festival",
      subCategory: "Diwali",
       isFeatured: true,
    },
    {
      id: "7",
      title: "Handmade Hamperf",
      sellerName: "seller shop name",
      image: ["https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=400"],
      price: 1800,
      rating: 4,
      reviews: 60,
      mainCategory: "Festival",
      subCategory: "Handmade",
       isFeatured: true,
    },
    {
      id: "8",
      title: "Festival HamperN",
      sellerName: "seller shop name",
      image: ["https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=400"],
      price: 1800,
      rating: 4,
      reviews: 60,
      mainCategory: "Festival",
      subCategory: "New Year",
       isFeatured: false,
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