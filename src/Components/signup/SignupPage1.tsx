import { Dispatch } from "react";
import { FaCameraRetro } from "react-icons/fa";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

type PropsDefinition = {
    photo: string
    artistName: string
    email: string
    password: string
    passwordConfirm: string
    setPhoto: Dispatch<React.SetStateAction<string>>
    setArtistName: Dispatch<React.SetStateAction<string>>
    setGenre: Dispatch<React.SetStateAction<string>>
    setPhoneNumber: Dispatch<React.SetStateAction<string>>
    setEmail: Dispatch<React.SetStateAction<string>>
    setPassword: Dispatch<React.SetStateAction<string>>
    setPasswordConfirm: Dispatch<React.SetStateAction<string>>
    setLocation: Dispatch<React.SetStateAction<string>>
    setFormPage: Dispatch<React.SetStateAction<number>>
}

export default function SignupBasicInfo(props: PropsDefinition) {
    const {photo,artistName, email, password, passwordConfirm, setPhoto, setArtistName, setGenre, setPhoneNumber, setEmail, setPassword, setPasswordConfirm, setLocation, setFormPage } = props;
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
          return false;
        }
        return true;
      }
    
      function handleNextStep() {
        if (!artistName || !email || !password) return;
        if (!handleConfirmPassword(passwordConfirm)) return;
        setFormPage(2);
      }
    
      return (
        <>
          <div className="pt-5 w-[22rem] pb-[7rem] flex flex-col items-center m-auto">
            <h1 className="text-2xl pb-3 font-bold">Your Info</h1>
        
              <div
                className="
                  z-0
                    flex 
                    flex-col 
                    m-auto
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
                placeholder="Connor O'Malley"
                required
                onChange={(e) => setArtistName(e.target.value)}
              />
              <InputField
                id="genre"
                type="text"
                labelName="Genre"
                placeholder="Irish Sea Shanties"
                onChange={(e) => setGenre(e.target.value)}
              />
              <InputField
                id="phoneNumber"
                type="text"
                labelName="Phone Number"
                placeholder="555-555-5555"
                required
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <InputField
                id="email"
                type="email"
                labelName="E-mail"
                placeholder="email@email.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputField
                id="password"
                type="password"
                labelName="Password"
                placeholder="********"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputField
                id="confirmPassword"
                type="password"
                labelName="Confirm Password"
                placeholder="********"
                required
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
              <InputField
                id="location"
                type="text"
                labelName="Location"
                placeholder="San Francisco, CA"
                onChange={(e) => setLocation(e.target.value)}
              />
              <p className="mt-4 text-center">
                Your contact info will never be made public.
              </p>
              <Button
                role="primary"
                size="medium"
                onClick={() => handleNextStep()}
              >
                Continue
              </Button>
            <div className="flex justify-start items-center mt-2">
              <p className="text-[#696767] ">Already have an account?</p>
              <Link to="/signup" className="bold text-black  ml-2">
                Login here
              </Link>
            </div>
          </div>
        </>
      );
    }