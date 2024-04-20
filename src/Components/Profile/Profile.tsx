import { FaCameraRetro } from "react-icons/fa";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

export default function Profile() {
const navigate = useNavigate();

  return (
    <>
      <h1>My Account</h1>
      <div className="flex flex-col items-center justify-start w-[22rem] m-auto">
        <div
          className="
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
            backgroundImage: `url(${localStorage.getItem("photoUrl")})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="rounded-full border-black border-[1px] w-[40px] h-[40px] flex justify-center items-center bg-white relative top-10 left-7 overflow-hidden">
            <FaCameraRetro size={25} />
          </div>
        </div>
        <div className="flex flex-col items-center pt-6 w-[22rem]">
          <h2>{localStorage.getItem("artistName")?.toLowerCase()}</h2>
          <h3>{localStorage.getItem("genre")?.toLowerCase()}</h3>
          <h4>{localStorage.getItem("location")?.toLowerCase()}</h4>
          <Button
            size="medium"
            role="primary"
            onClick={() => navigate('/signup')}
          >
            Edit
          </Button>
        </div>
      </div>
    </>
  );
}
