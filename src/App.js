import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './header/Header';
import AllRoutes from './Routes/Route';

function App() {
  return (
    <Router>
      <Header />
      <AllRoutes />
    </Router>
  );
}

export default App;
