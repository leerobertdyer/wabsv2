import { useEffect } from "react";

export default function TextNotification() {

    useEffect(() => {
        async function test() {
         const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/text-notification`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: 'Big Bobby Strikes Again', to: '+12318818138' })
        })
        if (resp) {
            const data = await resp.json();
            console.log(data)
        }
    }
        test();
    }, [])

  return (
    <div>
      <h1>TextNotification</h1>
    </div>
  );
}