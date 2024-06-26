import { Subscribers } from "./Components/Notifications/Notifications";
import { supabase } from "./supabaseClient";

async function updateSupabaseColumn(
  table: string,
  columnToUpdate: string,
  newValue: string | boolean,
  id: string
) {
  try {
    const { data, error } = await supabase
      .from(table)
      .update({ [columnToUpdate]: newValue })
      .eq("user_id", id);
    if (error) {
      console.error("Supabase Update Error:", error.message);
      return;
    }
    if (data) {
      console.log("Column Update Success:", data);
    } else {
      console.warn("Column Update Warning: No data returned. Might be fine.");
    }
  } catch (error) {
    console.error("Supabase Update Error:", error);
  }
}

async function deleteASong(publicUrl: string, storagePath: string) {
  //Delete from the table
  try {
    const { error } = await supabase
      .from("songs")
      .delete()
      .eq("publicUrl", publicUrl);
    if (error) {
      console.error("Supabase Delete Error:", error.message);
      return;
    }
    console.log("Row Deleted Successfully");
  } catch (error) {
    console.error("Supabase Delete Error:", error);
  }
  //Delete from the storage UPDATE THIS ONE
  console.log("now deleting from storage");
  try {
    const { error } = await supabase.storage
      .from("songs")
      .remove([storagePath]);
    if (error) {
      console.error("Supabase Storage Delete Error:", error.message);
      return;
    }
  } catch (error) {
    console.error("Supabase Storage Delete Error:", error);
  }
}

async function HandleLogout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    alert(error.message);
  }
}

async function getAllSubscribers() {
  const { data: users, error } = await supabase
  .from("users")
  .select("*")
  .eq("monthly_reminder", true);
  if (error) {
    console.error("Error fetching subscribers:", error.message);
    return;
  }
  if (users) {
    return users;
  }
}

async function getMonthlySubscribers(subscribers: Subscribers[]) {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;

  if (subscribers) {
    // Get all users who have not submitted a song this month using >= and <= (.gte and .lte)
    const { data: songsData } = await supabase
      .from("songs")
      .select("user_id")
      .gte("created_at", `${currentDate.getFullYear()}-${currentMonth}-01`)
      .lte("created_at", currentDate.toISOString());
    if (songsData) {
      // Extract user_ids from songsData
      const submittedUserIds = songsData.map((song) => song.user_id);
      // Find users without songs submitted this month
      const usersWithoutSongs = subscribers.filter(
        (user) => !submittedUserIds.includes(user.user_id)
      );
      return usersWithoutSongs;
    }
  }
}

export {
  updateSupabaseColumn,
  deleteASong,
  HandleLogout,
  getMonthlySubscribers,
  getAllSubscribers
};
