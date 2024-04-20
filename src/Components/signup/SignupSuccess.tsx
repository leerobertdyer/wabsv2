import { FaCircleCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";

export default function SignupSuccess() {
  const navigate = useNavigate();

  function handleContinueFromSuccess() {
    navigate("/profile");
  }

  return (
    <div className="flex flex-col items-center  justify-start w-[22rem] m-auto">
      <FaCircleCheck size={80} />
      <h5>Success</h5>
      <Button onClick={handleContinueFromSuccess} size="medium" role="primary">
        Continue
      </Button>
    </div>
  );
}
