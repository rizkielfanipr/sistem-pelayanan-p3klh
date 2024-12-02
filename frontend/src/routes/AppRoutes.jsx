import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import PenapisanDokling from '../pages/PenapisanDokling';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/penapisan-dokling" element={<PenapisanDokling />} />
    </Routes>
  );
};

export default AppRoutes;