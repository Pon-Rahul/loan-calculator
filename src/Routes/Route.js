import { Routes, Route } from "react-router-dom";
import Calculator from "../Calculator/Calculator";
import ErrorPage from "../Error/ErrorPage";
import ExchangeRates from "../ExchangeRates/ExchangeRates"


const AllRoutes = ({ darkMode }) => {
  return (
    <Routes>
      <Route path="/" element={<Calculator darkMode={darkMode} />} />
      <Route path="/exchange" element={<ExchangeRates darkMode={darkMode} />} />
      <Route path="/error" element={<ErrorPage darkMode={darkMode} />} />
    </Routes>
  );
};

export default AllRoutes;