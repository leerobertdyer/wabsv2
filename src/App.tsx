import NavBar from "./Components/NavBar/NavBar";
import Home from "./Views/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Login from "./Views/Login/Login";
import Signup from "./Views/signup/Signup";
import Profile from "./Views/Profile/Profile";
import Songs from "./Views/Songs/Songs";
import SubmitSong from "./Views/SubmitSong/SubmitSong";
import Buddies from "./Views/Buddies/Buddies";
import Contact from "./Views/Contact/Contact";

function App() {
  return (
    <Router>
      <div className="w-screen h-screen">
        <NavBar />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/login" Component={Login} />
          <Route path="/signup" Component={Signup} />
          <Route path="/profile" Component={Profile} />
          <Route path="/songs" Component={Songs} />
          <Route path="/submit-song" Component={SubmitSong} />
          <Route path="/buddies" Component={Buddies} />
          <Route path="/contact" Component={Contact} />
        </Routes>
        {window.location.pathname !== "/contact" && <Footer />}
      </div>
    </Router>
  );
}

export default App;
