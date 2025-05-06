import { Routes, Route } from "react-router-dom";
import Calculator from "../Calculator/Calculator";
// import About from "../components/About";
import ErrorPage from "../Error/ErrorPage";
import ExchangeRates from "../ExchangeRates/ExchangeRates"

function AllRoutes() {
  return (
    <Routes>
     <Route path="/" element={<Calculator />} />
     <Route path="/error" element={<ErrorPage />} />
     <Route path="/exchange" element={<ExchangeRates />} />
    </Routes> 
  );
}

export default AllRoutes;