import Header from "./components/Header";
import LandingScreen from "./screens/LandingScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import AboutScreen from "./screens/AboutScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<LandingScreen />} exact />
          <Route path="/login" element={<LoginScreen />} exact />
          <Route path="/signup" element={<SignupScreen />} exact />
          <Route path="/about" element={<AboutScreen />} exact />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
