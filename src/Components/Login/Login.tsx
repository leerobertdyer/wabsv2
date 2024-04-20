import { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "../InputField/InputField";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [rememberMe, setRememberMe] = useState(false);

  function handleLoginSubmit(e: React.MouseEvent) {
    e.preventDefault();
    if (email === "" || password === "") return;
    console.log(email, "Signed in.... but not for real yet....");
  }

  return (
    <>
      <div className="pt-5 w-[22rem] m-auto">
        <h1 className="text-2xl text-center pb-3 font-bold">Login</h1>
        <form className="flex flex-col items-center">
          <InputField
            id="email"
            type="email"
            placeholder="abc@gmail.com"
            labelName="E-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            id="password"
            type="password"
            placeholder="*****"
            labelName="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputField id="rememberMe" type="checkbox" labelName="Remember Me?" />
          <button
            className="
            text-white 
            bg-black 
            rounded-2xl 
            w-[330px] h-[56px] 
            mt-4"
            onClick={(e) => handleLoginSubmit(e)}
          >
            Login
          </button>
        </form>
        <div className="flex justify-start items-center mt-4">
          <p className="text-[#696767] mt-4">New to WABS?</p>
          <Link to="/signup" className="bold text-black mt-4 ml-2">
            Sign Up
          </Link>
        </div>
      </div>
    </>
  );
}
