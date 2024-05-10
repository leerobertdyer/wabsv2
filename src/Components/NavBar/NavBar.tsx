import { RxHamburgerMenu } from "react-icons/rx";

import "../../../public/mozartcolory.png";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type PropsDefinition = {
  handleUpdateLoginState: () => void;
  isLoggedIn: boolean;
};

export default function NavBar({
  handleUpdateLoginState,
  isLoggedIn,
}: PropsDefinition) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate()

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  function handleLogout() {
    toggleMenu();
    handleUpdateLoginState();
  }

  function handleLogoClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    setMenuOpen(false);
    e.stopPropagation();
    e.preventDefault();
    navigate("/")
  }

  function handleNavBarClick() {
    if (menuOpen) {
      setMenuOpen(false);
    }
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
      onClick={() => handleNavBarClick()}
    >
        <div
          className="rounded-full h-12 w-12 z-20"
          style={{
            backgroundImage: 'url("/logo.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            cursor: "pointer",
          }}
          onClick={(e) => handleLogoClick(e)}
        ></div>
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
        <>
        <RxHamburgerMenu className="sm:hidden text-3xl hover: cursor-pointer" onClick={() => toggleMenu()} />
        <div className="hidden sm:flex gap-4 ">
          <Link to="/profile" className="hover:cursor-pointer hover:text-wabsLink">My Account</Link>
          <Link to="/songs" className="hover:cursor-pointer hover:text-wabsLink">My Songs</Link>
          <Link to="/feed" className="hover:cursor-pointer hover:text-wabsLink">My Feed</Link>
          {isLoggedIn && (
            <p className="hover:cursor-pointer hover:text-wabsLink" onClick={handleLogout}>Logout</p>
          )}
        </div>
        </>
      )}
    </div>
  );
}
