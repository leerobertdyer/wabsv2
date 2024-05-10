import { Dispatch, SetStateAction } from "react";
import  Toggle  from "react-toggle";
import "react-toggle/style.css"


type PropsDefinition = {
  setMonthlyReminder: Dispatch<SetStateAction<boolean>>;
  monthlyReminder: boolean;
};

export default function SignupPage2({ setMonthlyReminder, monthlyReminder }: PropsDefinition) {
  return (
    <div className="flex flex-col items-center w-[22rem] m-auto">
      <h5 className="text-2xl font-bold">Monthly Reminders</h5>
      <p className="text-sm pt-2 pb-2">
      We will send you an e-mail reminder to write a song on the 15th of each month. You have the choice to turn it on or off.
      </p>
      <div className="w-full flex justify-between">
          <label className="flex items-center gap-2">
            Recieve e-mail:
            <Toggle
              defaultChecked={true}
              onChange={() => {setMonthlyReminder(!monthlyReminder)}}
            />
          </label>
      </div>
    </div>
  );
}
