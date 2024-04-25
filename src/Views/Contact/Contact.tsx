import { useState } from "react";
import InputField from "../../Components/InputField/InputField";
import Button from "../../Components/Button/Button";
import { FaCircleCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [messageSent, setMessageSent] = useState(false);

  function onSubmit() {
    if (!email || !subject || !message) return;
    console.log(email, subject, message);
    setMessageSent(true);
  }

  return (
    <div className="flex flex-col items-center justify-start pt-8 h-full w-[22rem] gap-2 m-auto">
      {messageSent ? (
        <>
          <FaCircleCheck className="fill-wabsSuccess" size={110} />
          <h2>Success!</h2>
          <h3>Your message has been sent!</h3>
          <Link className="w-full" to="/profile">
            <Button role="primary" size="full">
              Continue
            </Button>
          </Link>
        </>
      ) : (
        <>
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <InputField
            type="email"
            id="email"
            labelName="E-mail*"
            placeholder="Your E-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            type="text"
            id="subject"
            labelName="Subject*"
            placeholder="Subject"
            required
            onChange={(e) => setSubject(e.target.value)}
          />
          <textarea
            className="w-96 h-48 border-2 border-gray-400 rounded-md p-2"
            placeholder="Your message*"
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          <Button role="primary" size="full" onClick={onSubmit}>
            Send
          </Button>
        </>
      )}
    </div>
  );
}
