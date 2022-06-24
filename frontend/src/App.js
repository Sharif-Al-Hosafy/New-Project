import Header from "./components/Header";
import NavBar from "./components/NavBar";
import LandingScreen from "./screens/LandingScreen";
import LoginScreen from "./screens/LoginScreen";
import CustomerSignupScreen from "./screens/Signup/CustomerSignupScreen";
import VendorSignupScreen from "./screens/Signup/VendorSignupScreen";
import TailorSignupScreen from "./screens/Signup/TailorSignupScreen";
import ProductsScreen from "./screens/ProductsScreen";
import ServicesScreen from "./screens/ServicesScreen";
import CustomRequestsSceen from "./screens/CustomRequestsSceen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<LandingScreen />} exact />
          <Route path="/login" element={<LoginScreen />} exact />
          <Route path="/customer" element={<CustomerSignupScreen />} exact />
          <Route path="/vendor" element={<VendorSignupScreen />} exact />
          <Route path="/tailor" element={<TailorSignupScreen />} exact />
          <Route path="/products" element={<ProductsScreen />} exact />
          <Route path="/services" element={<ServicesScreen />} exact />
          <Route path="/requests" element={<CustomRequestsSceen />} exact />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
