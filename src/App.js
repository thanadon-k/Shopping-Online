import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './features/Home/Home';
import PlaceOrder from './features/PlaceOrder/PlaceOrder';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;