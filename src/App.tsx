import NavBar from "./Components/NavBar/NavBar";
import Home from "./Views/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Login from "./Views/Login/Login";
import Signup from "./Views/signup/Signup";
import Profile from "./Views/Profile/Profile";
import Songs from "./Views/Songs/Songs";
import SubmitSong from "./Views/SubmitSong/SubmitSong";
import Contact from "./Views/Contact/Contact";
import { supabase } from "./supabaseClient";
import Feed from "./Views/Feed/Feed";
import { useEffect, useState } from "react";

function App() {
  const [photo, setPhoto] = useState("");
  const [artistName, setArtistName] = useState("");
  const [genre, setGenre] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    getProfile();
  }, []);


async function getProfile() {
  //get the user
  const { data } = await supabase.auth.getUser();
  const user_id = data?.user?.id;

  // get the user profile
  const profile = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user_id);
  if (profile.error) {
    alert(`Error fetching profile: ${profile.error.message}`);
  }
  if (profile.data) {
    setPhoto(profile.data[0].photo);
    setArtistName(profile.data[0].artist_name);
    setGenre(profile.data[0].genre);
    setLocation(profile.data[0].location);
    setPhoneNumber(profile.data[0].phone_number);
  }
}

  return (
    <Router>
      <div className="w-screen h-screen">
        <NavBar />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/login" element={<Login getProfile={getProfile}/>} />
          <Route path="/signup" element={<Signup getProfile={getProfile} />} />
          <Route
            path="/profile"
            element={
              <Profile
                photo={photo}
                artistName={artistName}
                genre={genre}
                location={location}
                phoneNumber={phoneNumber}
                getProfile={getProfile}
              />
            }
          />
          <Route path="/songs" Component={Songs} />
          <Route path="/submit-song" element={<SubmitSong artistName={artistName} />} />
          <Route path="/feed" Component={Feed} />
          <Route path="/contact" Component={Contact} />
        </Routes>
        {window.location.pathname !== "/contact" && <Footer />}
      </div>
    </Router>
  );
}

export default App;
