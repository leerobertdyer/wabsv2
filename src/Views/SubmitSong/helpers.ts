import { supabase } from "../../supabaseClient";

type SubmitSongs = {
  title: string;
  lyrics: string;
  audio: string;
  finished: boolean;
};

async function submitSong(props: SubmitSongs) {
  const { title, lyrics, audio, finished } = props;
  const user = await supabase.auth.getUser();
  if (user.data?.user?.id) {
    const user_id = user.data.user.id;
    const { data, error } = await supabase.from("songs").insert([
      {
        user_id,
        title,
        lyrics,
        audio,
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


export { submitSong }