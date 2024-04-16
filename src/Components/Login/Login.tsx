import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [rememberMe, setRememberMe] = useState(false);

function handleLoginSubmit(e: React.MouseEvent) {
    e.preventDefault();
    if (email === "" || password === "") return
    console.log(email, 'Signed in.... but not for real yet....')
}

  return (
    <>
      <div className="pt-5 w-full">
        <h1 className="text-2xl text-center pb-3 font-bold">Login</h1>
        <div className="w-full">
          <form className="flex flex-col items-center">
            <div className="flex flex-col items-start">
              <label htmlFor="email" className="text-sm pb-2">
                E-mail
              </label>
              <input
                type="text"
                name="email"
                placeholder="abc@gmail.com"
                className="w-[345px] h-[35px] border-[1px] border-black rounded-xl p-2"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col mt-4 items-start">
              <label htmlFor="password" className="text-sm w-full pb-2">
                Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="w-[345px] h-[35px] border-[1px] border-black rounded-xl p-2"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-row-reverse gap-3 mt-3 items-start">
              <label htmlFor="rememberMe" className="text-sm pb-2">
                Remember Me?
              </label>
              <input id="rememberMe" name="rememberMe" type="checkbox" />
            </div>
            <button 
            className="
            text-white 
            bg-black 
            rounded-2xl 
            w-[330px] h-[56px] 
            mt-4"
            onClick={(e) => handleLoginSubmit(e)}>
              Login
            </button>
          </form>
        </div>
        <div className="flex justify-start ml-5 items-center mt-4">
        <p className="text-[#696767] mt-4">New to WABS?</p>
        <p className="bold text-black mt-4 ml-2">Sign Up</p>
        </div>
      </div>
    </>
  );
}
