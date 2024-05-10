import { Dispatch, SetStateAction } from "react";
import Toggle from "react-toggle";
import "react-toggle/style.css";

type PropsDefinition = {
  setMonthlyReminder: Dispatch<SetStateAction<boolean>>;
    monthly_reminder: boolean;
  notify_on_new_song: boolean;
  setNotifyOnNewSong: Dispatch<SetStateAction<boolean>>;
};

export default function SignupPage2({
  setMonthlyReminder,
    monthly_reminder,
  notify_on_new_song,
  setNotifyOnNewSong
}: PropsDefinition) {
  return (
    <div className="flex items-center justify-evenly py-10 bg-wabsPurpleLight">
      <div className="flex flex-col items-center w-[18rem]">
        <h5 className="text-2xl font-bold">Monthly Reminders</h5>
        <p className="text-sm pt-2 pb-2">
          We will send you an e-mail reminder to write a song on the 15th of
          each month. 
        </p>
        <div className="
        bg-wabsGrayLight 
        w-full flex 
        justify-between
        p-2 rounded-lg">
          <label className="flex items-center gap-2 w-full">
            Recieve e-mail:{" "}
          </label>
          <Toggle
            defaultChecked={true}
            onChange={() => {
              setMonthlyReminder(!monthly_reminder);
            }}
          />
        </div>
      </div>
      <div className="flex flex-col items-center w-[18rem]">
        <h5 className="text-2xl font-bold">Song Submissions</h5>
        <p className="text-sm pt-2 pb-2">
          We will send you an e-mail reminder every time a new song is submitted!
        </p>
        <div className="
        bg-wabsGrayLight 
        w-full flex 
        justify-between
        p-2 rounded-lg">
          <label className="flex items-center gap-2 w-full">
            Recieve e-mail:{" "}
          </label>
          <Toggle
            defaultChecked={true}
            onChange={() => {
              setNotifyOnNewSong(!notify_on_new_song);
            }}
          />
        </div>
      </div>
    </div>
  );
}
