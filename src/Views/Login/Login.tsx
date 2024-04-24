import { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "../../Components/InputField/InputField";
import Button from "../../Components/Button/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [rememberMe, setRememberMe] = useState(false);

  function handleLoginSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email");
      return;
    }
    if (!password) {
      alert("Please enter your password");
      return;
    }
    if (
      email !== localStorage.getItem("email") ||
      password !== localStorage.getItem("password")
    ) {
      alert("Invalid email or password");
      return;
    }
    localStorage.setItem("loggedIn", "true");
    console.log(email, "Signed in.... but not for real yet....");
  }

  return (
    <>
      <div className="pt-5 w-[22rem] m-auto">
        <h1 className="text-2xl text-center pb-3 font-bold">Login</h1>
        <form
          className="flex flex-col items-center"
          onSubmit={handleLoginSubmit}
        >
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
          <InputField
            id="rememberMe"
            type="checkbox"
            labelName="Remember Me?"
          />
          <Button type="submit" role="primary" size="full">
            Login
          </Button>
        </form>
        <div className="flex justify-start items-center mt-4">
          <p className="text-[#696767] mt-4">New to WABS?</p>
          <Link to="/signup" className="bold text-blue-800 mt-4 ml-2">
            Sign Up
          </Link>
        </div>
      </div>
    </>
  );
}
