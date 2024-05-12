import { Song, Subscribers } from "./Notifications";

type NotificationType = "monthly" | "new_song";

async function sendNotification(
  subscriber: Subscribers, 
  notificationType: NotificationType, 
  song?: Song) {
  const date = new Date().getDate();
  // Check if it's the 15th for monthly notifications (can later update this for user selection)
  if (notificationType === "monthly" && date !== 15) return;
  try {
    const endpoints: string[] = [];
    if (subscriber.reminder_type === "both") {
      // Push both email and text endpoints based on the notification type
      endpoints.push(
        notificationType === "monthly" ? 'monthly-email' : 'new-song-email',
        notificationType === "monthly" ? 'monthly-text' : 'new-song-text'
      );
    } else {
      // Push the single endpoint based on notification medium
      endpoints.push(
        notificationType === "monthly" ? `monthly-${subscriber.reminder_type}` : `new-song-${subscriber.reminder_type}`
      );
    }
    // Fetch all endpoints concurrently
      for (const endpoint of endpoints) {
      const body = song ? { subscriber, song } : { subscriber };
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    }

    // Await all fetch calls to complete
  }
  catch (error) {
    console.error(`Error fetching subscribers for ${notificationType} for ${subscriber.artist_name} `, error);
  }
}

export { sendNotification }