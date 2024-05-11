import { useEffect, useState } from "react";
import { getAllSubscribers, getMonthlySubscribers } from "../../supabaseHelpers";
import { useLocation, useNavigate } from "react-router-dom";
import { sendNotification } from "./helpers";

export type Subscribers = {
  email: string;
  artist_name: string;
  reminder_type: "text" | "email" | "both";
  user_id: string;
};

export type Song = {
  title: string;
  artist_name: string;
  publicUrl: string;
};

export default function Notifications() {
  const [subscribers, setSubscribers] = useState<Subscribers[]>([]);
  const [monthlySubscribers, setMonthlySubscribers] = useState<Subscribers[]>([]);
  const [urlParams, setUrlParams] = useState<URLSearchParams>();
  const [newSong, setNewSong] = useState<Song>();


  const windowLocation = useLocation();
  const navigate = useNavigate()

  //set url params and get monthly reminders for those who haven't submitted
  useEffect(() => {
    if (!windowLocation.search) return;
    const newUrlParams = new URLSearchParams(windowLocation.search);
    setUrlParams(newUrlParams);
    async function fetchSubscribers() {
      const nextSubscribers = await getAllSubscribers();
      if (nextSubscribers) {
        setSubscribers(nextSubscribers);
        const nextMonthlySubscribers = await getMonthlySubscribers(nextSubscribers);
        if (nextMonthlySubscribers) {
          setMonthlySubscribers(nextMonthlySubscribers);
        }
      }
    }
    fetchSubscribers();
  }, [windowLocation.search]);

  useEffect(() => {
    if (!urlParams) return;
    if (!urlParams.get("title") || !urlParams.get("artist_name") || !urlParams.get("publicUrl")) return;
    setNewSong({
      title: urlParams.get("title") || "",
      artist_name: urlParams.get("artist") || "",
      publicUrl: urlParams.get("publicUrl") || "",
    });
  }, [urlParams])

  // Use url params to either send monthly or new-song notifications
  useEffect(() => {
    if (urlParams) {
      if (monthlySubscribers.length > 0) {
        if (urlParams.get("notification_type") === "monthly") {
          for (const monthlySubscriber of monthlySubscribers) {
            if (monthlySubscriber.reminder_type === "email" || monthlySubscriber.reminder_type === "both")
              sendNotification(subscribers, "monthly", "email");
            if (monthlySubscriber.reminder_type === "text" || monthlySubscriber.reminder_type === "both") 
              sendNotification(subscribers, "monthly", "text");
          }
        }
        } else if (urlParams.get("notification_type") === "new_song" && subscribers.length > 0) {

          for (const subscriber of subscribers) {
            console.log(subscriber)
            if (subscriber.reminder_type === "email" || subscriber.reminder_type === "both") {
              sendNotification(subscribers, "new_song", "email", newSong);
              navigate("/feed")
            }
            if (subscriber.reminder_type === "text" || subscriber.reminder_type === "both") {
          sendNotification(subscribers, "new_song", "text", newSong);
          navigate("/feed")
            }
          }
        
        }
    }
    //eslint-disable-next-line
  }, [subscribers, urlParams, navigate, monthlySubscribers]);

  return (
    <div>
      <h1>
        {subscribers.length} {subscribers.length > 1 ? "Emails" : "Email"} sent!
      </h1>
    </div>
  );
}
