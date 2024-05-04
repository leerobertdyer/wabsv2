import { useEffect, useState } from "react";
import SongCard from "../../Components/SongCard/SongCard";
import Button from "../../Components/Button/Button";
import { Link } from "react-router-dom";
import { supabase } from "../../supabaseClient";

export type Song = {
  id: number;
  title: string;
  started: string;
  finished: boolean;
  lyrics: string;
  music: string;
};

export default function Songs() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [unfinishedSongs, setUnfinishedSongs] = useState<Song[]>([]);

  useEffect(() => {
    document.title = "W.A.B.S. Songs";
    async function getSongs() {
      const {data} = await supabase.auth.getUser()
      const user_id = data?.user?.id;
      console.log(user_id);
      const {data: songData} = await supabase.from("songs").select("*").eq("user_id", user_id);
      if (songData){
        const nextSongs = songData.filter((song: Song) => song.finished);
        const nextUnfinishedSongs = songData.filter((song: Song) => !song.finished);
        setSongs(nextSongs);
        setUnfinishedSongs(nextUnfinishedSongs);
      }
    }
    getSongs();
  }, []);

  function removeSong(id: number, finished: boolean) {
    if (finished) {
      const nextSongs = songs.filter((song) => song.id !== id);
      setSongs(nextSongs);
    } else {
      const nextUnfinishedSongs = unfinishedSongs.filter(
        (song) => song.id !== id
      );
      setUnfinishedSongs(nextUnfinishedSongs);
    }
  }

  return (
    <div className="p-4">
      <div className="w-[22rem] m-auto">
        <Link to="/submit-song">
          <Button type="button" role="primary" size="full">
            Add A Song +
          </Button>
        </Link>
      </div>
      <h1 className="text-xl font-bold">My Songs</h1>
      <div className="flex flex-col items-center gap-3">
        <h2>Songs In Progress</h2>
        <div className="flex flex-wrap w-full justify-evenly ">
          {unfinishedSongs.map((song) => (
            <SongCard song={song} handleRemoveSong={removeSong} />
          ))}
        </div>
        <h3>Songs Completed</h3>
        <div className="flex flex-wrap w-full justify-evenly">
          {songs.map((song) => (
            <SongCard song={song} handleRemoveSong={removeSong} />
          ))}
        </div>
      </div>
    </div>
  );
}
