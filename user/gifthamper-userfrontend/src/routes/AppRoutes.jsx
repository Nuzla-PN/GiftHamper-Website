import {Routes,Route} from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Home from "../pages/Home.jsx";
import CustomHamper from "../pages/CustomHamper.jsx";
import ProductListing from "../pages/ProductList.jsx";
import ProductDetails from "../pages/ProductDetails.jsx";
import SellerPage from "../pages/SellerShop.jsx";
import ScrollToTop from "../components/scrolltotop.jsx";
import GiftBoxSelection from "../pages/GiftBoxSelection.jsx";
import WrappingSelection from "../pages/WrappingSelection.jsx";
import GreetingCardSelection from "../pages/GreetingCardSelection.jsx";
import CustomizeProduct from "../pages/CustomizeProduct.jsx";
import CartPage from "../pages/Cart.jsx";
import WishlistPage from "../pages/Wishlist.jsx";
import Footer from "../components/Footer.jsx";
import MyOrdersPage from "../pages/Orders.jsx";



const AppRoutes = ()=>{
  return (
    <>
<Navbar />
<ScrollToTop/>
 <Routes>
    {/* public pages */}
      <Route path="/" element={<Home/>}/>
      <Route path="/custom-hamper" element={<CustomHamper/>}/>
      <Route path="/products" element={<ProductListing/>}/>
      <Route path = "/products/:id" element={<ProductDetails/>}/>
      <Route path="/customize/:id" element={<CustomizeProduct />} />
      <Route path = "/gift-box/:id" element = {<GiftBoxSelection/>}/>
      <Route path = "/wrapping/:id" element = {<WrappingSelection/>}/>
      <Route path = "/greeting-card/:id" element = {<GreetingCardSelection/>}/>
      <Route path = "/wishlist" element={<WishlistPage/>}/>
      <Route path = "/cart" element={<CartPage/>}/>
      <Route path = "/orders" element={<MyOrdersPage/>}/>
      <Route path="/seller/:sellerName" element={<SellerPage/>} />
</Routes>
<Footer/>
</>
  );
};

export default AppRoutes;