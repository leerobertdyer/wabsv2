import { Dispatch, SetStateAction } from "react";

type PropsDefinition = {
  setReminderStyle: Dispatch<SetStateAction<string>>;
};

export default function SignupPage2({ setReminderStyle }: PropsDefinition) {
  return (
    <div className="flex flex-col items-center w-[22rem] m-auto">
      <h5 className="text-2xl font-bold">Monthly Reminders</h5>
      <p className="text-sm pt-2 pb-2">
        We will send you a reminder to write a song on the 15th of each month.
        You have the choice to be reminded by text or e-mail.
      </p>
      <div className="w-full flex justify-between">
        <div className="flex flex-row-reverse justify-center gap-3">
          <label htmlFor="email-reminder">Email</label>
          <input
            type="radio"
            id="email-reminder"
            name="email-reminder"
            value="E-mail"
            onClick={() => setReminderStyle("E-mail")}
          />
        </div>
        <div className="flex flex-row-reverse justify-center gap-3">
          <label htmlFor="text-reminder">Phone Number</label>
          <input
            type="radio"
            id="text-reminder"
            name="text-reminder"
            value="Phone-Number"
            onClick={() => setReminderStyle("Phone-Number")}
          />
        </div>
      </div>
    </div>
  );
}
