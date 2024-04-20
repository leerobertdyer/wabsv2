import { useState } from "react";
import Button from "../Button/Button";
import SignupPage1 from "./SignupPage1";
import SignupPage2 from "./SignupPage2";
import SignupSuccess from "./SignupSuccess";

export default function Signup() {
  const [photo, setPhoto] = useState(() => {
    const storedPhotoUrl = localStorage.getItem("photoUrl");
    return storedPhotoUrl ? storedPhotoUrl : "";
  });
  const [artistName, setArtistName] = useState("");
  const [genre, setGenre] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [location, setLocation] = useState("");
  const [reminderStyle, setReminderStyle] = useState("");
  const [formPage, setFormPage] = useState(1);
  const [success, setSuccess] = useState(false);

  function handleSignupSubmit() {
    console.log("Signed up.... but not for real yet....");
    localStorage.setItem("artistName", artistName);
    localStorage.setItem("genre", genre);
    localStorage.setItem("phoneNumber", phoneNumber);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    localStorage.setItem("location", location);
    localStorage.setItem("reminderStyle", reminderStyle);
    setSuccess(true);
  }

  return (
    <>
      {success ? (
        <SignupSuccess />
      ) : (
        <>
          {formPage === 1 ? (
            <SignupPage1
              photo={photo}
              setPhoto={setPhoto}
              artistName={artistName}
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
            />
          ) : (
            <>
              <SignupPage2 setReminderStyle={setReminderStyle} />
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
