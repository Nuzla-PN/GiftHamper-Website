"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import Navbar from "../components/Navbar";
import ScrollToTop from "../components/scrolltotop";

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <ScrollToTop />
      <Navbar />
      {children}
    </Provider>
  );
}
