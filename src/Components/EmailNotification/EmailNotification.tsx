import { useEffect, useState } from "react";
import { getSubscribers, sendEmails } from "../../supabaseHelpers";

export default function EmailNotification() {
  const [emails, setEmails] = useState<string[]>([]);

  useEffect(() => {
    async function fetchSubscribersAndSendEmails() {
      const nextEmails = await getSubscribers();
      if (nextEmails) setEmails(nextEmails);
    }
    fetchSubscribersAndSendEmails();
  }, []);

  useEffect(() => {
    if (emails.length > 0) {
      sendEmails(emails);
    }
  }, [emails]);


  return (
  <div>
  <h1>
  {emails.length} {emails.length > 1 ? "Emails" : "Email"} sent!
      </h1>
    </div>
  );
  
}

