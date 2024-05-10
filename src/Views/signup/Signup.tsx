import { useState } from "react";
import Button from "../../Components/Button/Button";
import SignupPage1 from "./SignupPage1";
import SignupPage2 from "./SignupPage2";
import SignupSuccess from "./SignupSuccess";
import { signupWithSupabase } from "./helpers";
import Loading from "../../Components/Loading/Loading";

type PropsDefinition = {
  getProfile: () => void;
};

export default function Signup({ getProfile }: PropsDefinition) {
  const [photo, setPhoto] = useState(() => {
    const storedPhotoUrl = localStorage.getItem("photoUrl");
    return storedPhotoUrl ? storedPhotoUrl : "";
  });
  const [artist_name, setArtistName] = useState("");
  const [genre, setGenre] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [location, setLocation] = useState("");
  const [monthly_reminder, setMonthlyReminder] = useState(true);
  const [formPage, setFormPage] = useState(1);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notify_on_new_song, setNotifyOnNewSong] = useState(true);

  async function handleSignupSubmit() {
    await signupWithSupabase({
      email,
      password,
      photo,
      artist_name,
      genre,
      phone_number,
      location,
      monthly_reminder,
      notify_on_new_song,
    });
    getProfile();
    setSuccess(true);
  }

  return (
    <>
    {isLoading && <Loading title="Uploading Song" />}
      {success ? (
        <SignupSuccess />
      ) : (
        <>
          {formPage === 1 ? (
            <SignupPage1
              photo={photo}
              setPhoto={setPhoto}
              artist_name={artist_name}
              setArtistName={setArtistName}
              setGenre={setGenre}
              setPhoneNumber={setPhoneNumber}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              passwordConfirm={passwordConfirm}
              setPasswordConfirm={setPasswordConfirm}
              setLocation={setLocation}
              setFormPage={setFormPage}
              setIsLoading={setIsLoading}
            />
          ) : (
            <>
              <SignupPage2 
              monthly_reminder={monthly_reminder} 
              setMonthlyReminder={setMonthlyReminder} 
              notify_on_new_song={notify_on_new_song}
              setNotifyOnNewSong={setNotifyOnNewSong}/>
              <div className="w-[22rem] m-auto flex justify-center">
                <Button
                  role="primary"
                  size="medium"
                  onClick={handleSignupSubmit}
                >
                  Continue
                </Button>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
