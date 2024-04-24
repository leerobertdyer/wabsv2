import { useEffect, useState } from "react";
import BuddyCard, { Buddy } from "../../Components/BuddyCard/BuddyCard";

const tempBuddies = [
    {name: "Buddy 1", location: "Location 1", photo: "/fakeDude.png"},    
]

export default function Buddies() {
const [buddies, setBuddies] = useState<Buddy[]>([]);

useEffect(() => {
    setBuddies(tempBuddies);
}, []);    

  return (
    <div className="p-4">
      <h2 className="text-xl">My Buddies</h2>
      <div className="flex flex-col items-center gap-3">
        {buddies.map((buddy) => <BuddyCard {...buddy} />)}
      </div>
    </div>
  );
}
