import { useEffect, useState } from "react";
import BuddyCard, { Buddy } from "../../Components/BuddyCard/BuddyCard";
import InputField from "../../Components/InputField/InputField";

const tempBuddies = [
    {name: "Buddy 1", location: "Location 1", photo: "/fakeDude.png"},    
]

export default function Buddies() {
const [buddies, setBuddies] = useState<Buddy[]>([]);

useEffect(() => {
    setBuddies(tempBuddies);
}, []);    

  return (
    <div className="p-4 flex flex-col gap-4 items-start">
      <h2 className="text-xl ">My Buddies</h2>
      <div className="flex flex-col items-center gap-3">
        {buddies.map((buddy, key) => <BuddyCard key={key} {...buddy} />)}
      </div>
      <h3 className="text-[1.25rem]">Want more buddies?</h3>
      <p className="text-[1rem]">Send us your friends’ e-mails and we will send them an invite!</p>
      <InputField type="email" id="email" labelName="E-mail" placeholder="Friend's e-mail" />
    </div>
  );
}
