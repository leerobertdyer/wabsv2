import { FormEvent, useState } from "react";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { FaCameraRetro } from "react-icons/fa6";

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

  function handlePhotoDivClick() {
    document.getElementById("photo")?.click();
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const url = reader.result;
        if (typeof url === "string") {
          localStorage.setItem("photoUrl", url);
          setPhoto(url);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  function handleConfirmPassword(confirmPassword: string) {
    if (confirmPassword !== password) {
      alert("Passwords do not match");
      return false
    }
    return true
  }

  function handleSignupSubmit(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!artistName || !email || !password) return;
    if (!handleConfirmPassword(passwordConfirm)) return;
    console.log("Signed up.... but not for real yet....");
  }

  return (
    <>
      <div className="pt-5 w-full">
        <h1 className="text-2xl pb-3 font-bold">Your Info</h1>
        <div className="w-full">
          <form onSubmit={() => handleSignupSubmit}>
            <div className="flex flex-col w-[400px] items-center m-auto">
              <div
                className="
                flex 
                flex-col 
                rounded-full 
                w-[100px] 
                h-[100px] 
                bg-gray-200 
                items-center 
                justify-center"
                style={{
                  backgroundImage:
                    photo === "" ? 'url("/mozartcolory.png")' : `url(${photo})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                onClick={handlePhotoDivClick}
              >
                <div className="rounded-full border-black border-[1px] w-[40px] h-[40px] flex justify-center items-center bg-white relative top-10 left-7 overflow-hidden">
                  <FaCameraRetro size={25} />
                </div>
              </div>
              <div hidden>
                <InputField
                  id="photo"
                  type="file"
                  labelName="Photo"
                  onChange={(e) => handlePhotoChange(e)}
                />
              </div>
              <InputField
                id="artistName"
                type="text"
                labelName="Artist Name"
                required
                onChange={(e) => setArtistName(e.target.value)}
                />
                <InputField
                id="genre"
                type="text"
                labelName="Genre"
                onChange={(e) => setGenre(e.target.value)}
                />
                <InputField
                id="phoneNumber"
                type="text"
                labelName="Phone Number"
                onChange={(e) => setPhoneNumber(e.target.value)}
                />
              <InputField
                id="email"
                type="email"
                labelName="E-mail"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputField
                id="password"
                type="password"
                labelName="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputField
              id="confirmPassword"
                type="password"
                labelName="Confirm Password"
                required
                onChange={(e) => setPasswordConfirm(e.target.value)}
                />
              <Button
                role="primary"
                size="medium"
                onClick={(e) => handleSignupSubmit(e)}
              >
                Sign up
              </Button>
            </div>
          </form>
        </div>
        <div className="flex justify-start ml-5 items-center mt-4">
          <p className="text-[#696767] mt-4">Already have an account?</p>
          <Link to="/signup" className="bold text-black mt-4 ml-2">
            Login here
          </Link>
        </div>
      </div>
    </>
  );
}
