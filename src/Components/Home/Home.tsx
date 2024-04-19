import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

export default function Home() {
  return (
    <div className="bg-white p-4 flex flex-col items-center">
      <div
        className="overflow-hidden h-[343px] w-[343px] flex flex-col  justify-end items-center"
        style={{
          backgroundImage: 'url("/mozartcolory.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-[#E1E5E8] w-full">
          <h1 className="text-2xl font-bold">We can't all be Mozart,</h1>
          <p className="text-sm pb-2">
            sometimes we need to Write a{" "}
            <span className="line-through">bad</span> song.
          </p>
          <div
            className="
                      text-white 
                      bg-black 
                      rounded-xl 
                      w-[185px] 
                      h-[48px]
                      flex
                      justify-center
                      align-center            
                      "
          >
            <Link
              to="/login"
              className="
          flex 
          flex-col 
          justify-center"
            >
              Write
            </Link>
          </div>
        </div>
      </div>
      <div className="p-5 w-[343px] h-[343px] overflow-hidden flex flex-col align-center justify-center">
        <p className="text-sm pt-2">Keep you and your friends accountable</p>
        <p className="text-xs pt-2 text-[#737373]">
          Write a song once a month and remind your friends to write one too!
        </p>
        <div
          className="overflow-hidden h-[235px] mt-4 w-full flex flex-col  justify-start items-center"
          style={{
            backgroundImage: 'url("/mozartcolory.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="flex flex-col">
          <div className="flex mt-2">
            <FaStar size={25} />
            <FaStar size={25} />
            <FaStar size={25} />
            <FaStar size={25} />
            <FaRegStar size={25} />
          </div>
          <p className="text-[#737373] text-sm pt-2">
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
