import { RxHamburgerMenu } from "react-icons/rx";

import "../../../public/mozartcolory.png";
import { useState } from "react";
import { Link } from "react-router-dom";

type PropsDefinition = {
  handleUpdateLoginState: () => void;
  isLoggedIn: boolean;
};

export default function NavBar({
  handleUpdateLoginState,
  isLoggedIn,
}: PropsDefinition) {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  function handleLogout() {
    toggleMenu();
    handleUpdateLoginState();
  }

  return (
    <div
      className="
      bg-white 
      h-[100px]
      border-b-[1px] 
      border-[#D9D9D9] 
      flex 
      justify-between 
      items-center p-4"
    >
      <Link to="/">
        <div
          className="rounded-full h-12 w-12 z-20"
          style={{
            backgroundImage: 'url("/logo.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </Link>
      {menuOpen ? (
        <div
          className="
    z-10
    p-6
    border-black 
    absolute top-0 
    right-0 w-full 
    h-[12rem] 
    bg-white 
    text-wabsPurple 
    flex
    flex-col
    justify-center
    items-center
    gap-3
    text-2xl"
        >
          <p
            className="text-[3rem] absolute top-7 right-7 hover:cursor-pointer"
            onClick={() => toggleMenu()}
          >
            x
          </p>
          <Link
            className="
            hover:bg-wabsPurple
            hover:cursor-pointer
            hover:text-white 
            w-[8rem] rounded-lg
            text-center p-2 
            underline text-sm"
            to="/profile"
            onClick={() => toggleMenu()}
          >
            My Account
          </Link>
          <Link
            className="
            hover:bg-wabsPurple
            hover:cursor-pointer
            hover:text-white 
            w-[8rem] rounded-lg
            text-center p-2 
            underline text-sm"
            to="/songs"
            onClick={() => toggleMenu()}
          >
            My Songs
          </Link>
          <Link
            className="
            hover:bg-wabsPurple
            hover:cursor-pointer
            hover:text-white 
            w-[8rem] rounded-lg
            text-center p-2 
            underline text-sm"
            to="/feed"
            onClick={() => toggleMenu()}
          >
            My Feed
          </Link>
          {isLoggedIn && (
            <p
              className="
              hover:bg-wabsPurple
              hover:cursor-pointer
              hover:text-white 
              w-[8rem] 
              text-center p-2 
              rounded-lg 
              underline text-sm"
              onClick={handleLogout}
            >
              Logout
            </p>
          )}
        </div>
      ) : (
        <RxHamburgerMenu className="text-3xl" onClick={() => toggleMenu()} />
      )}
    </div>
  );
}
