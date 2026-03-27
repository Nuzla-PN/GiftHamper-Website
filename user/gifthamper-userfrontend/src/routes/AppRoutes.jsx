import {Routes,Route} from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Home from "../pages/Home.jsx";
import CustomHamper from "../pages/CustomHamper.jsx";
import ProductListing from "../pages/ProductList.jsx";
import ProductDetails from "../pages/ProductDetails.jsx";
import SellerPage from "../pages/SellerShop.jsx";
import ScrollToTop from "../components/scrolltotop.jsx";


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
      <Route path="/seller/:sellerName" element={<SellerPage/>} />
</Routes>
</>
  );
};

export default AppRoutes;