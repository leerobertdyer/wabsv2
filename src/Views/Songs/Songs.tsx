import { useEffect, useState } from "react";
import Button from "../../Components/Button/Button";
import { Link } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { deleteASong } from "../../supabaseHelpers";
import FeedCard from "../../Components/FeedCard/FeedCard";

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

  useEffect(() => {
    document.title = "WABS - Songs";
    async function getSongs() {
      const {data} = await supabase.auth.getUser()
      const user_id = data?.user?.id;
      const {data: songData} = await supabase.from("songs").select("*").eq("user_id", user_id);
      if (songData){
        const nextSongs = songData.filter((song: Song) => song.finished);
        const nextUnfinishedSongs = songData.filter((song: Song) => !song.finished);
        setSongs(nextSongs);
        setUnfinishedSongs(nextUnfinishedSongs);
      }
      const {data: profileData} = await supabase.from("users").select("*").eq("user_id", user_id).single();  
      if (profileData)
        {
          setPhoto(profileData.photo); 
          setLocation(profileData.location); 
          setArtist(profileData.artist_name)
        } 

    }
    getSongs();
  }, []);

  async function handleDeleteSong(publicUrl: string, storagePath: string) {
    await deleteASong(publicUrl, storagePath);
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
          {unfinishedSongs.map((song, idx) => (
            <FeedCard  key={idx}
            publicUrl={song.publicUrl}
            storagePath={song.storagePath}
            photo={photo}
            location={location}
            title={song.title}
            lyrics={song.lyrics}
            artist={artist}
            user_id={song.user_id}
            song_id={song.id}
            handleDeleteSong={handleDeleteSong}/>
          ))}
        </div>
        <h3>Songs Completed</h3>
        <div className="flex flex-wrap w-full justify-evenly">
          {songs.map((song, idx) => (
            <FeedCard  key={idx}
            publicUrl={song.publicUrl}
            storagePath={song.storagePath}
            photo={photo}
            location={location}
            title={song.title}
            lyrics={song.lyrics}
            artist={artist}
            user_id={song.user_id}
            song_id={song.id}
            handleDeleteSong={handleDeleteSong}/>
          ))}
        </div>
      </div>
    </div>
  );
}
