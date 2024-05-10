import { useEffect, useState } from "react";
import { getMonthlySubscribers } from "../../supabaseHelpers";
import { useLocation } from "react-router-dom";
import { sendNotification } from "./helpers";

export type Subscribers = {
  email: string;
  artist_name: string;
  reminder_type: "text" | "email" | "both";
};

export default function Notifications() {
  const [subscribers, setSubscribers] = useState<Subscribers[]>([]);
  const [urlParams, setUrlParams] = useState<URLSearchParams>();

  const windowLocation = useLocation();

  //set url params and get monthly reminders for those who haven't submitted
  useEffect(() => {
    if (!windowLocation.search) return;
    const newUrlParams = new URLSearchParams(windowLocation.search);
    setUrlParams(newUrlParams);
    async function fetchSubscribers() {
      const nextSubscribers = await getMonthlySubscribers();
      if (nextSubscribers) {
        setSubscribers(nextSubscribers);
      }
    }
    fetchSubscribers();
  }, [windowLocation.search]);

  // Use url params to either send monthly or new-song notifications
  useEffect(() => {
    if (urlParams) {
      for (const [key, value] of urlParams.entries()) {
        console.log(key, value);
      }
      console.log(subscribers)
      if (subscribers.length > 0) {
        if (urlParams.get("notification_type") === "monthly") {
          for (const subscriber of subscribers) {
            if (subscriber.reminder_type === "email" || subscriber.reminder_type === "both")
              sendNotification(subscribers, "monthly", "email");
            if (subscriber.reminder_type === "text" || subscriber.reminder_type === "both") 
              sendNotification(subscribers, "monthly", "text");
          }
        } else if (urlParams.get("notification_type") === "new_song") {
          for (const subscriber of subscribers) {
            if (subscriber.reminder_type === "email" || subscriber.reminder_type === "both") {
          sendNotification(subscribers, "new_song", "email");
            }
            if (subscriber.reminder_type === "text" || subscriber.reminder_type === "both") {
          sendNotification(subscribers, "new_song", "text");
            }
          }
        
        }
      }
    }
  }, [subscribers, urlParams]);

  return (
    <div>
      <h1>
        {subscribers.length} {subscribers.length > 1 ? "Emails" : "Email"} sent!
      </h1>
    </div>
  );
}
