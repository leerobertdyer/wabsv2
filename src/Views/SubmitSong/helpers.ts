import { supabase } from "../../supabaseClient";

type SubmitSongs = {
  title: string;
  lyrics: string;
  publicUrl: string;
  storagePath: string;
  photo: string;
  location: string;
  artistName: string;
  song_id?: number;
  finished: boolean;
};

async function updateSong(props: SubmitSongs) {
  const { title, lyrics, publicUrl, finished, storagePath, photo, location, artistName, song_id } = props;
  const user = await supabase.auth.getUser();
  if (user.data?.user?.id) {
    const user_id = user.data.user.id;
    const { data, error } = await supabase.from("songs").update([
      {
        user_id,
        title,
        lyrics,
        publicUrl,
        storagePath,
        photo,
        location,
        artistName,
        finished
      },
    ]).eq('id', song_id)
    if (error) {
      alert(error.message);
      return;
    }
    return data;
  }
}

async function submitSong(props: SubmitSongs) {
  const { title, lyrics, publicUrl, finished, storagePath, photo, location, artistName } = props;
  console.log(photo, location, artistName)
  const user = await supabase.auth.getUser();
  if (user.data?.user?.id) {
    const user_id = user.data.user.id;
    const { data, error } = await supabase.from("songs").insert([
      {
        user_id,
        title,
        lyrics,
        publicUrl,
        storagePath,
        photo,
        location,
        artistName,
        finished
      },
    ]);
    if (error) {
      alert(error.message);
      return;
    }
    return data;
  }
}


export { submitSong, updateSong }