import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

export default function EmailNotification() {
    const [emails, setEmails] = useState<string[]>([])

    useEffect(() => {
    async function getSubscribers() {
        const { data } = await supabase.from('users').select('email').eq('monthly_reminder', true)
        if (data) {
            console.log(data)
            const nextEmails = data.map((user: {email: string}) => user.email)
            setEmails(nextEmails)
        }
    }
    getSubscribers()
    }, [])

  return (
    <div>
      <h1>{emails.length} {emails.length > 1 ? 'Emails' : "Email"} sent!</h1>
    </div>
  );
}