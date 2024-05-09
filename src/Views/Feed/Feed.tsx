import { useEffect, useState } from "react";
import FeedCard from "../../Components/FeedCard/FeedCard";
import { supabase } from "../../supabaseClient";
import { deleteASong } from "../../supabaseHelpers";

type Song = {
  user_id: string;
  title: string;
  lyrics: string;
  artistName: string;
  location: string;
  photo: string;
  publicUrl: string;
  storagePath: string;
  id: number;
  finished: boolean;
};

export default function Feed() {
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    getSongs();
  }, []);

  async function getSongs() {
    const { data, error } = await supabase
      .from("songs")
      .select(`*`)
      .order("created_at", { ascending: false });

    if (error) {
      alert(`Error fetching songs: ${error.message}`);
    }
    if (data) {
      setSongs(data);
      console.log(data);
    }
  }

  async function handleDeleteSong(publicUrl: string, storagePath: string) {
    await deleteASong(publicUrl, storagePath);
  }

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl font-bold">My Feed</h2>
      {songs.map((song, idx) => (
        <FeedCard
        handleDeleteSong={handleDeleteSong}
          key={idx}
          publicUrl={song.publicUrl}
          storagePath={song.storagePath}
          photo={song.photo}
          location={song.location}
          title={song.title}
          lyrics={song.lyrics}
          artist={song.artistName}
          song_id={song.id}
          user_id={song.user_id}
        />
      ))}
    </div>
  );
}
