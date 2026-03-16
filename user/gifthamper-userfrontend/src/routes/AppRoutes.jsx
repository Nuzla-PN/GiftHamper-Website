import {Routes,Route} from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Home from "../pages/Home.jsx";

const AppRoutes = ()=>{
  return (
    <>
<Navbar />
 <Routes>
    {/* public pages */}
      <Route path="/" element={<Home/>}/>
</Routes>
</>
  );
};

export default AppRoutes;