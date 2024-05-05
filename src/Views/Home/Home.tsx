import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import Button from "../../Components/Button/Button";

export default function Home() {
  return (
    <div className="bg-white p-4 pb-[8rem] flex flex-col items-center">
      <div
        className="overflow-hidden h-[343px] w-w[343px] flex flex-col  justify-end items-center"
        style={{
          backgroundImage: 'url("/mozartcolory.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-white text-3xl text-wabsSecondary w-full">
          <h1>We can't all be Mozart,</h1>
          <p className="pb-2">
            Let's write a {" "}
            <span className="line-through">bad</span> song.
          </p>
        </div>
      </div>
      <div className="w-[22rem] ">
          <Link to="/login">
        <Button role="primary" size="full">
        Login
        </Button>
          </Link>
      </div>
      <div className="p-5 flex flex-col align-center justify-center">
        <p className="text-2xl pt-2">Writing is a muscle...<br/>And bad songs are the weights that create metaphorical six packs.</p>
        <p className="text-xs pt-2 text-[#737373]">
          Write a bad song, so when a good song comes you're ready!
        </p>
        <div
          className="overflow-hidden h-[235px] min-h-[13rem] mt-4 w-full flex flex-col  justify-start items-center"
          style={{
            backgroundImage: 'url("/musicians1.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
              <div className="w-[22rem] py-3 h-fit">
          <Link to="/login">
        <Button role="primary" size="full">
        Go
        </Button>
          </Link>
      </div>
        <div className="flex flex-col">
          <div className="flex mt-2">
            <FaStar size={23} fill="#0075B2" />
            <FaStar size={23} fill="#0075B2" />
            <FaStar size={23} fill="#0075B2" />
            <FaStar size={23} fill="#0075B2" />
            <FaRegStar size={23} fill="#0075B2" />
          </div>
          <p className="text-wabsSecondary text-xl pt-2">
            It’s the best app ever!!!! Writing one song a month keeps me focused
            and consistent!
          </p>
          <div className="flex items-center pt-2 gap-3 h-[50px]">
            <div
              className="rounded-full h-[50px] w-[50px]"
              style={{
                backgroundImage: 'url("/mozartcolory.png")',
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div>
              <p className="text-sm">Regina Miles</p>
              <p className="text-sm text-[#252B42]">Guitarist</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
