import { useEffect, useState } from "react";
import SongCard from "../../Components/SongCard/SongCard";
import Button from "../../Components/Button/Button";
import { Link } from "react-router-dom";

const tempSongs = [
  { id: 1, title: "Song 1", started: "12/22/2021", finished: true },
  { id: 2, title: "Song 2", started: "12/22/2021", finished: true },
  { id: 3, title: "Song 3", started: "12/22/2021", finished: true },
  { id: 4, title: "Song 4", started: "today", finished: false },
  { id: 5, title: "Song 5", started: "01/11/2072", finished: false },
];

export type Song = {
  id: number;
  title: string;
  started: string;
  finished: boolean;
};

export default function Songs() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [unfinishedSongs, setUnfinishedSongs] = useState<Song[]>([]);

  useEffect(() => {
    document.title = "W.A.B.S. Songs";
    if (!localStorage.getItem("songs")) {
    setSongs(tempSongs.filter((song) => song.finished));
    setUnfinishedSongs(tempSongs.filter((song) => !song.finished));
    } else {
        setSongs(JSON.parse(localStorage.getItem("songs") || ""));
        setUnfinishedSongs(JSON.parse(localStorage.getItem("unfinishedSongs") || ""));
    }
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
