import { useState } from "react";
import Button from "../../Components/Button/Button";
import SignupPage1 from "./SignupPage1";
import SignupPage2 from "./SignupPage2";
import SignupSuccess from "./SignupSuccess";
import { signupWithSupabase, storeAdditionalUserData } from "./helpers";

type PropsDefinition = {
  getProfile: () => void;
};

export default function Signup({ getProfile }: PropsDefinition) {
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
  const [monthlyReminder, setMonthlyReminder] = useState(false);
  const [formPage, setFormPage] = useState(1);
  const [success, setSuccess] = useState(false);

  async function handleSignupSubmit() {
    await signupWithSupabase({
      email,
      password
    });
    await storeAdditionalUserData({
      photo,
      artistName,
      genre,
      phoneNumber,
      location,
      monthlyReminder,
    });
    getProfile();
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
              <SignupPage2 monthlyReminder={monthlyReminder} setMonthlyReminder={setMonthlyReminder} />
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
