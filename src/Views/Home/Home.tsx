import { Link } from "react-router-dom";
import { FaStar, FaRegStar } from "react-icons/fa";
import Button from "../../Components/Button/Button";

export default function Home() {
  return (
    <div className="bg-white p-4 pb-[8rem] md:px-[15%] flex flex-col ">
      {/* Mobile Header: We can't all be Mozart... */}
      <div className="sm:hidden flex flex-col items-center">
        <div
          className="overflow-hidden rounded-md h-[343px] w-w[343px] flex flex-col justify-end items-center"
          style={{
            backgroundImage: 'url("/mozartcolory.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-white text-3xl text-wabsSecondary w-full">
            <h1>We can't all be Mozart,</h1>
            <p className="pb-2">
              Let's write a <span className="line-through">bad</span> song.
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
      </div>
      {/* Desktop Header: We can't all be Mozart... */}
      <div className="hidden sm:block">
        <div className="flex justify-between p-2 w-full text-3xl text-wabsSecondary">
          <div className="w-[20rem] flex flex-col justify-between p-4">
            <h1>
              We can't all be Mozart,
              <p className="pb-2">
                Let's write a <span className="line-through">bad</span> song.
              </p>
            </h1>
            <p className="text-[1rem]">
              Write a <span className="crossed">bad</span>
              song this month to keep your friends and yourself accountable.
            </p>
            <div className="w-full flex justify-between">
              <Link to="/login">
                <Button role="primary" size="small">
                  Log In
                </Button>
              </Link>
              <Link to="/signup">
                <Button role="secondary" size="small">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>

          <div
            className="overflow-hidden rounded-md h-[310px] w-[310px]"
            style={{
              backgroundImage: 'url("/mozartcolory.png")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>
      </div>
      {/* Writing Is A Muscle Mobile */}
      <div className="p-5 flex flex-col align-center justify-center w-full sm:hidden">
        <div>
          <p className="text-2xl pt-2">
            Writing is a muscle...
            <br />
            And bad songs are the weights that create metaphorical six packs.
          </p>
          <p className="text-xs pt-2 text-[#737373]">
            Write a bad song, so when a good song comes you're ready!
          </p>
        </div>
        <div
          className="overflow-hidden rounded-md h-[235px] min-h-[13rem] mt-4 w-full flex flex-col  justify-start items-center"
          style={{
            backgroundImage: 'url("/musicians1.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="w-[22rem] py-3 h-fit">
          <Link to="/submit-song">
            <Button role="primary" size="full">
              Write
            </Button>
          </Link>
        </div>
      </div>

      {/* Writing Is A Muscle DESKTOP */}
      <div className="hidden sm:block">
        <div className="flex align-center justify-center w-full">
          <div
            className="h-[15rem] rounded-md mt-4 w-full"
            style={{
              backgroundImage: 'url("/musicians1.png")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="flex flex-col justify-center items-center text-center">
            <p className="text-xl pt-2">
              Writing is a muscle...
              <br />
              And bad songs are the weights that create metaphorical six packs.
            </p>
            <p className="text-xs pt-2 text-wabsGray">
              Write a bad song, so when a good song comes you're ready!
            </p>
            <div className="w-[22rem] py-3 h-fit">
              <Link to="/submit-song">
                <Button role="primary" size="medium">
                  Write
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex justify-between w-full"></div>
      </div>
      {/* Reviews Start */}
      <div className="flex">
        <div className="flex flex-col-reverse p-5 sm:w-[45vw]">
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
          <div className="flex items-center gap-3">
            <div
              className="rounded-full h-[50px] w-[50px]"
              style={{
                backgroundImage: 'url("/mozartcolory.png")',
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div>
              <p className="text-sm text-[#252B42]">Guitarist</p>
              <p className="text-sm">Regina Miles</p>
            </div>
          </div>
        </div>
        {/* Review 1 End */}
        {/* Review 2 Start */}

        <div className="hidden sm:flex flex-col-reverse p-5 w-[45vw]">
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
          <div className="flex items-center gap-3">
            <div
              className="rounded-full h-[50px] w-[50px]"
              style={{
                backgroundImage: 'url("/mozartcolory.png")',
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div>
              <p className="text-sm text-[#252B42]">Guitarist</p>
              <p className="text-sm">Regina Miles</p>
            </div>
          </div>
        </div>
        {/* Review 2End */}
      </div>
    </div>
  );
}
