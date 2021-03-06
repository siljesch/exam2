import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Nav from "./components/nav/Nav";
import { AuthProvider } from "./context/AuthContext";
import Admin from "./pages/Admin";
import AdminEstablishment from "./pages/AdminEstablishment";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import Login from "./pages/Login";
import Result from "./pages/Result";
import "./sass/style.scss";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Nav />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/:location" element={<Result />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/establishment" element={<AdminEstablishment />} />
          </Routes>
          <Footer />
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
