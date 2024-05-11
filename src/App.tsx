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
import { HandleLogout } from "./supabaseHelpers";
import Notification from "./Components/Notifications/Notifications";

function App() {
  const [photo, setPhoto] = useState("");
  const [artistName, setArtistName] = useState("");
  const [genre, setGenre] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [monthly_reminder, setMonthlyReminder] = useState(false);
  const [notify_on_new_song, setNotifyOnNewSong] = useState(false);
  const [reminder_type, setReminderType] = useState("");

  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    const { data } = await supabase.auth.getUser();
    if (data.user === null) return;
    const user_id = data.user.id;

    const profile = await supabase
      .from("users")
      .select("*")
      .eq("user_id", user_id);
    if (profile.error) {
      console.log(`Error fetching profile: ${profile.error.message}`);
      return;
    }
    if (profile.data) {
      setPhoto(profile.data[0].photo);
      setArtistName(profile.data[0].artist_name);
      setGenre(profile.data[0].genre);
      setLocation(profile.data[0].location);
      setPhoneNumber(profile.data[0].phone_number);
      setMonthlyReminder(profile.data[0].monthly_reminder);
      setNotifyOnNewSong(profile.data[0].notify_on_new_song);
      setReminderType(profile.data[0].reminder_type);
      setIsLoggedIn(true);
    }
  }


function handleUpdateLoginState() {
  setIsLoggedIn(false)
  HandleLogout()
}  

  return (
    <Router>
      <div className="w-screen h-screen">
        <NavBar handleUpdateLoginState={handleUpdateLoginState} isLoggedIn={isLoggedIn}/>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Profile
                  {...{
                    photo,
                    artistName,
                    genre,
                    location,
                    phoneNumber,
                    getProfile,
                    reminder_type,
                    monthly_reminder,
                    notify_on_new_song,
                    handleUpdateLoginState
                  }}
                />
              ) : (
                <Home />
              )
            }
          />
          <Route path="/login" element={<Login getProfile={getProfile} />} />
          <Route path="/signup" element={<Signup getProfile={getProfile} />} />
          <Route path="/send-notification" element={<Notification />} />
          <Route
            path="/profile"
            element={
              <Profile
                photo={photo}
                artistName={artistName}
                genre={genre}
                location={location}
                phoneNumber={phoneNumber}
                monthly_reminder={monthly_reminder}
                notify_on_new_song={notify_on_new_song}
                reminder_type={reminder_type}
                getProfile={getProfile}
                handleUpdateLoginState={handleUpdateLoginState}
              />
            }
          />
          <Route path="/songs" element={<Songs />} />
          <Route
            path="/submit-song"
            element={
              <SubmitSong
                artistName={artistName}
                photo={photo}
                location={location}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route path="/feed" element={<Feed />} />
          <Route path="/contact" Component={Contact} />
        </Routes>
        {window.location.pathname !== "/contact" && <Footer />}
      </div>
    </Router>
  );
}

export default App;
