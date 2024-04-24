import { RxHamburgerMenu } from "react-icons/rx";

import "../../../public/mozartcolory.png";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
    // document.body.style.overflow = menuOpen ? "auto" : "hidden";
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
      <div
        className="rounded-full bg-gray-200 h-12 w-12 z-20"
        style={{
          backgroundImage: 'url("/mozartcolory.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
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
          <p className="text-3xl absolute top-7 right-7 hover:cursor-pointer" onClick={() => toggleMenu()}>x</p>
          <Link className="underline text-sm" to="/profile">My Account</Link>
          <Link className="underline text-sm" to="/songs">My Songs</Link>
          <Link className="underline text-sm" to="/buddies">My Buddies</Link>
        </div>
      ) : (
        <RxHamburgerMenu className="text-3xl" onClick={() => toggleMenu()} />
      )}
    </div>
  );
}
