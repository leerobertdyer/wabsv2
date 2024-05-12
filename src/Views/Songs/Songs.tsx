import { useEffect, useState } from "react";
import Button from "../../Components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { deleteASong } from "../../supabaseHelpers";
import FeedCard from "../../Components/FeedCard/FeedCard";
import { supabase } from "../../supabaseClient";

export type Song = {
  id: number;
  title: string;
  started: string;
  finished: boolean;
  lyrics: string;
  publicUrl: string;
  storagePath: string;
  user_id: string;
};

export default function Songs() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [unfinishedSongs, setUnfinishedSongs] = useState<Song[]>([]);
  const [photo, setPhoto] = useState("");
  const [location, setLocation] = useState("");
  const [artist, setArtist] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    console.log("unfinished Songs", unfinishedSongs);
    console.log("Songs", songs);
  }, [songs, unfinishedSongs]);

  useEffect(() => {
    async function checkForUser() {
      const user = await supabase.auth.getUser();
      if (user.data.user === null) navigate("/login");
    }
    checkForUser();
  }, [navigate]);

  useEffect(() => {
    document.title = "WABS - Songs";
    async function getSongs() {
      const { data } = await supabase.auth.getUser();
      const user_id = data?.user?.id;
      const { data: songData } = await supabase
        .from("songs")
        .select("*")
        .eq("user_id", user_id);
      if (songData) {
        const nextSongs = songData.filter((song: Song) => song.finished);
        const nextUnfinishedSongs = songData.filter(
          (song: Song) => !song.finished
        );
        setSongs(nextSongs);
        setUnfinishedSongs(nextUnfinishedSongs);
      }
      const { data: profileData } = await supabase
        .from("users")
        .select("*")
        .eq("user_id", user_id)
        .single();
      if (profileData) {
        setPhoto(profileData.photo);
        setLocation(profileData.location);
        setArtist(profileData.artist_name);
      }
    }
    getSongs();
  }, []);

  async function handleDeleteSong(publicUrl: string, storagePath: string) {
    await deleteASong(publicUrl, storagePath);
  }

  return (
    <div className="text-center">
      <h1 className="w-screen text-white p-4 mb-8 bg-wabsPurple text-xl font-bold">My Songs</h1>
      <div className="w-[22rem] m-auto">
        <Link to="/submit-song">
          <Button type="button" role="primary" size="full">
            Add A Song +
          </Button>
        </Link>
      </div>
      <div className="flex flex-col items-center pt-4">
        {unfinishedSongs.length > 0 && (
          <>
          <h2 className="text-2xl text-wabsPurple p-4 text-center">
            Songs In Progress
          </h2>
        <div className="flex flex-wrap justify-evenly p-4">
          {unfinishedSongs.map((song, idx) => (
            <FeedCard
            key={idx}
            publicUrl={song.publicUrl}
            storagePath={song.storagePath}
            photo={photo}
            location={location}
            title={song.title}
            lyrics={song.lyrics}
            artist={artist}
            user_id={song.user_id}
            song_id={song.id}
            handleDeleteSong={handleDeleteSong}
            />
          ))}
        </div>
        <br/><br/>
          </>
        )}
        <h3 className="bg-white text-wabsPurple text-2xl p-4 text-center w-fit m-auto">
          Finished Songs
        </h3>
        <div className="flex flex-wrap w-full justify-evenly">
          {songs.map((song, idx) => (
            <FeedCard
              key={idx}
              publicUrl={song.publicUrl}
              storagePath={song.storagePath}
              photo={photo}
              location={location}
              title={song.title}
              lyrics={song.lyrics}
              artist={artist}
              user_id={song.user_id}
              song_id={song.id}
              handleDeleteSong={handleDeleteSong}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
