import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

export default function EmailNotification() {
    const [emails, setEmails] = useState<string[]>([])

    useEffect(() => {
    async function getSubscribers() {
        const { data } = await supabase.from('profiles').select('user_id').eq('monthly_reminder', true)
        if (data) {
            const user1 = await supabase.from('auth.users').select('email').eq('id', data[0].user_id)
            console.log(user1)
            console.log(data)
            console.log(emails)
            setEmails([])
        }
    }
    getSubscribers()
    }, [])

  return (
    <div>
      <h1>Emails sent!</h1>
    </div>
  );
}