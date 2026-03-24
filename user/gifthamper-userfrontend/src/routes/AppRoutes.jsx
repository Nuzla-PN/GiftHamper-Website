import {Routes,Route} from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Home from "../pages/Home.jsx";
import CustomHamper from "../pages/CustomHamper.jsx";
import ProductListing from "../pages/ProductList.jsx";


const AppRoutes = ()=>{
  return (
    <>
<Navbar />
 <Routes>
    {/* public pages */}
      <Route path="/" element={<Home/>}/>
      <Route path="/custom-hamper" element={<CustomHamper/>}/>
      <Route path = "/products" element={<ProductListing/>}/>
</Routes>
</>
  );
};

export default AppRoutes;