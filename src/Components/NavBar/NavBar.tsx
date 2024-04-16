import { RxHamburgerMenu } from "react-icons/rx";

import "../../../public/mozartcolory.png";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

function toggleMenu() {
    setMenuOpen(!menuOpen);
    document.body.style.overflow = menuOpen ? 'auto' : 'hidden';
  }

  return (
    <div className="
    {menuOpen ? 'overflow-hidden' : ''}
    bg-white h-[100px] border-b-[1px] border-[#D9D9D9] flex justify-between items-center p-4">
      <div
        className="rounded-full bg-gray-200 h-12 w-12"
        style={{
          backgroundImage: 'url("/mozartcolory.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
      </div>
    { menuOpen 
    ? <div 
    className="
    border-3 
    border-black 
    absolute top-0 
    left-0 w-full 
    h-full 
    bg-black 
    text-white 
    bg-opacity-90
    flex
    flex-col
    pt-[100px]
    items-center
    gap-3
    text-2xl"
    onClick={() => toggleMenu()}> 
    <Link to="/">Home</Link>
    <Link to="/login">Login</Link>
    </div> 
    : <RxHamburgerMenu className="text-3xl" onClick={() => toggleMenu()} /> }
    </div>
  );
}
