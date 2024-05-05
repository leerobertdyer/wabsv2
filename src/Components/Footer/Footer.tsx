import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <div
      className="
    bg-wabsPurple 
    fixed 
    bottom-0 
    pl-4 
    gap-2 
    text-white 
    flex 
    flex-col 
    justify-center 
    items-start 
    w-full 
    h-20"
    >
      <Link to="/contact" className="text-[1rem] underline">
        Contact
      </Link>
      <p className="text-[.75rem]">@2024 Write a Bad Song</p>
    </div>
  );
}
