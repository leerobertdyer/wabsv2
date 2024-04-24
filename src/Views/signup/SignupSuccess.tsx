import { FaCircleCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";

export default function SignupSuccess() {
  const navigate = useNavigate();

  function handleContinueFromSuccess() {
    navigate("/profile");
  }

  return (
    <div className="flex flex-col items-center  justify-start w-[22rem] pt-6 m-auto">
      <FaCircleCheck className='fill-wabsSuccess' size={110} />
      <h5>Success</h5>
      <h6>Please check your email for confirmation.</h6>
      <Button onClick={handleContinueFromSuccess} size="medium" role="primary">
        Continue
      </Button>
    </div>
  );
}
