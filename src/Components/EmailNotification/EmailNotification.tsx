import { useEffect, useState } from "react";
import { getSubscribers, sendEmails } from "../../supabaseHelpers";

export type Subscribers = {
  email: string;
  artist_name: string;
}

export default function EmailNotification() {
  const [subscribers, setSubscribers] = useState<Subscribers[]>([]);

  useEffect(() => {
    async function fetchSubscribers() {
      const nextSubscribers = await getSubscribers();
      if (nextSubscribers) {
       console.log(nextSubscribers)
        setSubscribers(nextSubscribers);
      }
    }
    fetchSubscribers();
  }, []);

  useEffect(() => {
    if (subscribers.length > 0) {
      sendEmails(subscribers, "monthly");
    }
  }, [subscribers]);


  return (
  <div>
  <h1>
  {subscribers.length} {subscribers.length > 1 ? "Emails" : "Email"} sent!
      </h1>
    </div>
  );
  
}

