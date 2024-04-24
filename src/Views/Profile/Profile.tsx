import { FaCameraRetro } from "react-icons/fa";
import Button from "../../Components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Profile() {
  const [photo, setPhoto] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("loggedIn")) navigate("/login");
    const storedPhotoUrl = localStorage.getItem("photoUrl");
    setPhoto(storedPhotoUrl ? storedPhotoUrl : "");
  }, [navigate]);

  return (
    <div className="p-4">
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
            backgroundImage: photo
              ? `url(${localStorage.getItem("photoUrl")})`
              : 'url("/fakeDude.png")',
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
            size="full"
            role="primary"
            onClick={() => navigate("/signup")}
          >
            Edit
          </Button>
        </div>
      </div>
      <div className="mt-4 flex flex-col justify-around min-h-[20rem] h-fit gap-2">
        <h5 className="font-bold text-[1.25rem]">Your Songs</h5>
        <p>
          You have no songs! Go <Link className="text-wabsLink" to="/submit-song">Write A Bad Song!</Link>
        </p>
        <h6 className="font-bold text-[1.25rem]">Your Buddies</h6>
        <p>You have no buddies! Help your friends!</p>
        <Link className="text-wabsLink" to="/">
          Log Out
        </Link>
      </div>
    </div>
  );
}
