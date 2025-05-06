import { Routes, Route } from "react-router-dom";
import Calculator from "../Calculator/Calculator";
// import About from "../components/About";
import ErrorPage from "../Error/ErrorPage";

function AllRoutes() {
  return (
    <Routes>
     <Route path="/" element={<Calculator />} />
     <Route path="/error" element={<ErrorPage />} />
       {/*<Route path="/about" element={<About />} />
      <Route path="/exchange" element={<div>Exchange Rates Page</div>} />
      <Route path="*" element={<ErrorPage />} />*/}
    </Routes> 
  );
}

export default AllRoutes;