import { Dispatch, SetStateAction } from "react";
import Toggle from "react-toggle";
import "react-toggle/style.css";

type PropsDefinition = {
  setMonthlyReminder: Dispatch<SetStateAction<boolean>>;
  monthlyReminder: boolean;
};

export default function SignupPage2({
  setMonthlyReminder,
  monthlyReminder,
}: PropsDefinition) {
  return (
    <div className="flex align-center bg-pink-200">
      <div className="flex flex-col items-center w-[22rem] m-auto">
        <h5 className="text-2xl font-bold">Monthly Reminders</h5>
        <p className="text-sm pt-2 pb-2">
          We will send you a monthly reminder to write and submit a song on the
          15th of each month.
        </p>
        <div className="w-full flex justify-between bg-wabsGrayLight p-4 my-2 rounded-xl">
          <label className="flex items-center gap-2">Recieve e-mail: </label>
          <Toggle
            defaultChecked={true}
            icons={{
              checked: null,
              unchecked: null,
            }}
            onChange={() => {
              setMonthlyReminder(!monthlyReminder);
            }}
          />
        </div>
        <div className="w-full flex flex-col justify-between bg-wabsGrayLight p-4  rounded-xl text-xs">
          <div className="w-full flex justify-between">
            <label className="flex items-center gap-2">
              Recieve text-notifications:{" "}
            </label>
            <Toggle
              defaultChecked={false}
              icons={{
                checked: null,
                unchecked: null,
              }}
              onChange={() => {
                setMonthlyReminder(!monthlyReminder);
              }}
            />
          </div>
          <br />
          <p className="">
            *By toggling this on, I agree to receive marketing and promotional
            SMS from 1-833-382-1443. msg & data rates may apply. Reply STOP to
            opt out. HELP for help.
          </p>
        </div>
      </div>
      <div className="flex my-4 flex-col items-center w-[22rem] m-auto">
        <h5 className="text-2xl font-bold">Song Reminders</h5>
        <p className="text-sm pt-2 pb-2">
          We will send a notification any time a user submits a song, along with
          a link to listen!
        </p>
        <div className="w-full flex justify-between bg-wabsGrayLight p-4 my-2 rounded-xl">
          <label className="flex items-center gap-2 ">Recieve e-mail: </label>
          <Toggle
            defaultChecked={true}
            icons={{
              checked: null,
              unchecked: null,
            }}
            onChange={() => {
              setMonthlyReminder(!monthlyReminder);
            }}
          />
        </div>
        <div className="w-full flex flex-col justify-between bg-wabsGrayLight p-4 mt-2 rounded-xl text-xs">
          <div className="w-full flex justify-between">
            <label className="flex items-center gap-2">
              Recieve text-notifications:{" "}
            </label>
            <Toggle
              defaultChecked={false}
              icons={{
                checked: null,
                unchecked: null,
              }}
              onChange={() => {
                setMonthlyReminder(!monthlyReminder);
              }}
            />
          </div>
          <br />
          <p className="">
            *By toggling this on, I agree to receive marketing and promotional
            SMS from 1-833-382-1443. msg & data rates may apply. Reply STOP to
            opt out. HELP for help.
          </p>
        </div>
      </div>
    </div>
  );
}
