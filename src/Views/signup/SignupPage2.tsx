import { Dispatch, SetStateAction } from "react";
import Toggle from "react-toggle";
import "react-toggle/style.css";

type PropsDefinition = {
  setMonthlyReminder: Dispatch<SetStateAction<boolean>>;
  monthly_reminder: boolean;
  notify_on_new_song: boolean;
  setNotifyOnNewSong: Dispatch<SetStateAction<boolean>>;
  reminder_type: "email" | "text" | "both" | null;
  setReminderType: Dispatch<SetStateAction<"email" | "text" | "both" | null>>;
};

export default function SignupPage2({
  setMonthlyReminder,
  monthly_reminder,
  notify_on_new_song,
  setNotifyOnNewSong,
  reminder_type,
  setReminderType,
}: PropsDefinition) {
  function handleNotificationPreferences(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setReminderType(reminder_type);
  }

  return (
    <>
      <div className="flex items-center justify-evenly py-10 bg-wabsPurpleLight">
        <div className="flex flex-col items-center w-[18rem]">
          <h5 className="text-2xl font-bold">Monthly Reminders</h5>
          <p className="text-sm pt-2 pb-2">
            We will send you an e-mail reminder to write a song on the 15th of
            each month.
          </p>
          <div
            className="
        bg-wabsGrayLight 
        w-full flex 
        justify-between
        p-2 rounded-lg"
          >
            <label className="flex items-center gap-2 w-full">
              Monthly Reminders:
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
            We will send you an e-mail reminder every time a new song is
            submitted!
          </p>
          <div
            className="
        bg-wabsGrayLight 
        w-full flex 
        justify-between
        p-2 rounded-lg"
          >
            <label className="flex items-center gap-2 w-full">
              Song Submissions:{" "}
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
      <div
        className="
        bg-wabsGrayLight 
        w-[22rem] m-auto 
        flex my-4
        justify-center
        p-2 rounded-lg"
      >
        <form onSubmit={(e) => handleNotificationPreferences(e)}>
          <label className="flex items-center justify-end gap-2 flex-row-reverse">
            Email Notifications
            <input
              type="radio"
              name="reminder_type"
              value="email"
              defaultChecked
              onChange={() => setReminderType("email")}
            />
          </label>
          <label className="flex items-center justify-end gap-2 flex-row-reverse">
            Text Notifications
            <input
              type="radio"
              name="reminder_type"
              value="text"
              onChange={() => setReminderType("text")}
            />
          </label>
          <label className="flex items-center justify-end gap-2 flex-row-reverse">
            Both
            <input
              type="radio"
              name="reminder_type"
              value="both"
              onChange={() => setReminderType("both")}
            />
          </label>
        </form>
      </div>
    </>
  );
}
