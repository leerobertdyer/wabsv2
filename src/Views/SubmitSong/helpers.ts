import { Subscribers } from "../../Components/Notifications/Notifications";
import { sendNotification } from "../../Components/Notifications/helpers";
import { supabase } from "../../supabaseClient";
import { getAllSubscribers } from "../../supabaseHelpers";

type SubmitSongs = {
  title: string;
  lyrics: string;
  publicUrl: string;
  storagePath: string;
  photo: string;
  location: string;
  artist_name: string;
  song_id?: number;
  finished: boolean;
};

async function updateSong(props: SubmitSongs) {
  const {
    title,
    lyrics,
    publicUrl,
    finished,
    storagePath,
    photo,
    location,
    artist_name: artist_name,
    song_id,
  } = props;
  const user = await supabase.auth.getUser();
  if (user.data?.user?.id) {
    const user_id = user.data.user.id;
    const { error } = await supabase
      .from("songs")
      .update([
        {
          user_id,
          title,
          lyrics,
          publicUrl,
          storagePath,
          photo,
          location,
          artist_name,
          finished,
        },
      ])
      .eq("id", song_id);
    if (error) {
      alert(error.message);
      return;
    }
  }
}

async function submitSong(props: SubmitSongs) {
  const {
    title,
    lyrics,
    publicUrl,
    finished,
    storagePath,
    photo,
    location,
    artist_name: artist_name,
  } = props;
  const user = await supabase.auth.getUser();
  if (user.data?.user?.id) {
    const user_id = user.data.user.id;
    const { error } = await supabase.from("songs").insert([
      {
        user_id,
        title,
        lyrics,
        publicUrl,
        storagePath,
        photo,
        location,
        artist_name,
        finished,
      },
    ]);
    if (error) {
      alert(error.message);
      return;
    }
    const { data: songData } = await supabase.storage
      .from("songs")
      .getPublicUrl(`/${artist_name}/${title}`);
    if (!songData?.publicUrl) return alert("Error getting public URL");
    const allSubscribers = await getAllSubscribers();
    if (allSubscribers) {
      const newSongSubscribers: Subscribers[] = allSubscribers.filter(
        (subscriber) => subscriber.notify_on_new_song === true
      );
      if (newSongSubscribers) {
        for (const subscriber of newSongSubscribers) {
          sendNotification(subscriber, "new_song", {
            title,
            artist_name,
            publicUrl: songData.publicUrl,
          });
        }
      }
    }
  }
}

export { submitSong, updateSong };
