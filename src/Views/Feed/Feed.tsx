import { useEffect, useState } from "react";
import FeedCard from "../../Components/FeedCard/FeedCard";
import { supabase } from "../../supabaseClient";

type Song =
  {
    user_id: string
    title: string
    lyrics: string
    artist: string
    location: string
    photo: string
    audio: string
    finished: boolean
  }

export default function Feed() {
  const [songs, setSongs] = useState<Song[]>([])

    useEffect(() => {
     getSongs();
    }, [])

    useEffect(() => {
      const fetchPhotos = async () => {
        const updatedSongs = await Promise.all(
          songs.map(async (song) => {
            const { data: profileData, error: profileError } = await supabase
              .from('profiles')
              .select('photo, artist_name, location')
              .eq('user_id', song.user_id)
              .single();
            
            if (profileError) {
              alert(`Error fetching profile: ${profileError.message}`);
              return song;
            }
  
            if (profileData) {
              song.photo = profileData.photo;
              song.artist = profileData.artist_name;
              song.location = profileData.location;
            }
  
            return song;
          })
        );
        const nextSongs = updatedSongs.filter((song) => song.finished)
        setSongs(nextSongs);
      };
  
      fetchPhotos();
    }, [songs]);
  

    async function getSongs()
    {
      const { data, error } = await supabase
        .from("songs")
        .select(`*`)
        .order("created_at", { ascending: false })
   
      if (error) {
        alert(`Error fetching songs: ${error.message}`);
      }
      if (data) 
        setSongs(data)
    }

  return (
    <div className="flex flex-col gap-2">
  <h2 className="text-2xl font-bold">My Feed</h2>
  {songs.map((song, idx) => (
    <FeedCard
    key={idx}
    audio={song.audio}
    photo={song.photo}
    location={song.location}
    title={song.title}
    lyrics={song.lyrics}
    artist={song.artist}
    />
  ))}
  </div>
)
}
