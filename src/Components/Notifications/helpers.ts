import { Song, Subscribers } from "./Notifications";

type NotificationType = "monthly" | "new_song";
type NotificationMedium = "email" | "text" | "both";

async function sendNotification(
  subscribers: Subscribers[], 
  notificationType: NotificationType, 
  notificationMedium: NotificationMedium,
  song?: Song) {
  // const date = new Date().getDate();
  // Check if it's the 15th for monthly notifications (can later update this for user selection)
  // if (notificationType === "monthly" && date !== 15) return;
  try {
    const endpoints: string[] = [];
    if (notificationMedium === "both") {
      // Push both email and text endpoints based on the notification type
      endpoints.push(
        notificationType === "monthly" ? 'monthly-email' : 'new-song-email',
        notificationType === "monthly" ? 'monthly-text' : 'new-song-text'
      );
    } else {
      // Push the single endpoint based on notification medium
      endpoints.push(
        notificationType === "monthly" ? `monthly-${notificationMedium}` : `new-song-${notificationMedium}`
      );
    }
    // Fetch all endpoints concurrently
    const fetchPromises = endpoints.map(endpoint => {
      const body = song ? { subscribers, song } : { subscribers };
      console.log(`Sending ${notificationType} ${notificationMedium} notification to ${endpoint} endpoint`);
      return fetch(`${import.meta.env.VITE_BACKEND_URL}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    });

    // Await all fetch calls to complete
    await Promise.all(fetchPromises);
  } catch (error) {
    console.error(`Error fetching subscribers for ${notificationType} ${notificationMedium} notification`, error);
  }
}

export { sendNotification }