import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import CalculatePrice from '../pages/CalculatePrice';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculate-price" element={<CalculatePrice />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;