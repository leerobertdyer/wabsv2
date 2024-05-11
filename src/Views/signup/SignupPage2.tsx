import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import IntlTelInput from "intl-tel-input/react";
import "intl-tel-input/build/css/intlTelInput.css";

type PropsDefinition = {
  setMonthlyReminder: Dispatch<SetStateAction<boolean>>;
  monthly_reminder: boolean;
  notify_on_new_song: boolean;
  setNotifyOnNewSong: Dispatch<SetStateAction<boolean>>;
  reminder_type: "email" | "text" | "both" | null;
  setReminderType: Dispatch<SetStateAction<"email" | "text" | "both" | null>>;
  setPhoneNumber: Dispatch<SetStateAction<string>>;
};

export default function SignupPage2({
  setMonthlyReminder,
  monthly_reminder,
  notify_on_new_song,
  setNotifyOnNewSong,
  reminder_type,
  setReminderType,
  setPhoneNumber,
}: PropsDefinition) {
  const [validPhoneNumber, setValidPhoneNumber] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (isValid) {
      setPhoneNumber(validPhoneNumber);
    }
    //eslint-disable-next-line
  }, [validPhoneNumber]);

  useEffect(() => {
    if (!isValid) {
      setPhoneNumber(""); 
    }
  }, [isValid, setPhoneNumber])

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
        w-[18.75rem] m-auto 
        flex my-4
        justify-center
        p-3 rounded-lg"
      >
        <form
          onSubmit={(e) => handleNotificationPreferences(e)}
          className="w-full"
        >
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
          <div
            className={
              reminder_type === "text" || reminder_type === "both"
                ? "block"
                : "hidden"
            }
          >
            <IntlTelInput
              initialValue={""}
              onChangeNumber={(e) => setValidPhoneNumber(e)}
              onChangeValidity={(e) => setIsValid(e)}
              onChangeErrorCode={(e) => {
                if (e) console.log("Error: ", e);
              }}
              // any initialisation options from the readme will work here
              initOptions={{
                initialCountry: "us",
                separateDialCode: true,
                placeholderNumberType: "MOBILE",
                autoPlaceholder: "aggressive",
                formatAsYouType: true,
                formatOnDisplay: true,
                nationalMode: false,
                utilsScript: "/node_modules/intl-tel-input/build/js/utils.js",
              }}
            />
          </div>
        </form>
      </div>
    </>
  );
}
