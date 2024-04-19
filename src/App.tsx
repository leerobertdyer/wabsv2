import NavBar from "./Components/NavBar/NavBar";
import Home from "./Components/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Login from "./Components/Login/Login";
import Signup from "./Components/signup/Signup";

function App() {
  return (
    <Router>
      <div className="w-screen h-screen">
        <NavBar />
        <Routes>
        <Route path="/" Component={Home} />
        <Route path="/login" Component={Login} />
        <Route path="/signup" Component={Signup} />
        </Routes>
      <Footer />
      </div>
</Router>

  );
}

export default App;
