import { useEffect, useState } from "react";
import Button from "../../Components/Button/Button";
import InputField from "../../Components/InputField/InputField";
import { IoMusicalNotesOutline } from "react-icons/io5";
import { IoMdSave } from "react-icons/io";
import { FaCircleCheck } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { submitSong, updateSong } from "./helpers";
import { supabase } from "../../supabaseClient";
import Loading from "../../Components/Loading/Loading";
import { useLocation } from 'react-router-dom';

type PropsDefinition = {
  artist_name: string;
  photo: string;
  location: string;
  isLoggedIn: boolean;
};

export default function SubmitSong({
  artist_name,
  location,
  photo,
  isLoggedIn
}: PropsDefinition) {
  const [songTitle, setSongTitle] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [music, setMusic] = useState("");
  const [storagePath, setStoragePath] = useState("");
  const [song_id, setSongId] = useState<number>();
  const [success, setSuccess] = useState(false);
  const [finished, setFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) navigate("/signup")
    }, [isLoggedIn, navigate])

  const windowLocation = useLocation()

  // Check for url params for editing
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const editParam = urlParams.get("edit");
    if (!editParam) return;
    const decodedLyrics = decodeURIComponent(urlParams.get('lyrics') || "");
    setSongTitle(urlParams.get("title") || "");
    setLyrics(decodedLyrics);
    setMusic(urlParams.get("publicUrl") || "");
    setStoragePath(urlParams.get("storagePath") || "");
    setSongId(Number(urlParams.get("song_id")) || undefined);
    setIsUpdating(true);
  }, [windowLocation.search]);

  // Trigger audio input
  function onMusicIconClick() {
    document.getElementById("addMusic")?.click();
  }

  // Upload Audio File
  async function handleUploadAudio(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    if (!songTitle) return alert('Please enter a song title before uploading audio.')
    setIsLoading(true);
    const file = e.target.files[0];
    const { data, error } = await supabase.storage
      .from("songs")
      .upload(`/${songTitle}`, file);
    if (error) {
      alert(`Audio upload failed. Please try again. ${error.message}`);
      setIsLoading(false);
      return;
    }
    if (data.path) setStoragePath(data.path);
    if (data) {
      const { data: songData } = supabase.storage
        .from("songs")
        .getPublicUrl(`/${artist_name}/${songTitle}`);
      if (!songData.publicUrl) return alert("Error getting public URL")
      setMusic(songData.publicUrl);
      setIsLoading(false);
    }
  }

  // Handle UNFINISHED song submission
  function onSaveClick() {
    if (!songTitle) return;
    if (isUpdating && song_id) {
      updateSong({
        title: songTitle,
        lyrics: lyrics,
        publicUrl: music,
        storagePath: storagePath,
        photo,
        location,
        artist_name,
        song_id,
        finished: false,
      });
    } else {
      submitSong({
        title: songTitle,
        lyrics: lyrics,
        publicUrl: music,
        storagePath: storagePath,
        photo,
        location,
        artist_name,
        finished: false,
      });
    }
    setSuccess(true);
    setIsUpdating(false);
  }

  // Handle FINISHED song submission
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!songTitle || !lyrics || !music) return;
    if (isUpdating && song_id) {
      updateSong({
        title: songTitle,
        lyrics: lyrics,
        publicUrl: music,
        storagePath: storagePath,
        photo,
        location,
        artist_name,
        finished: true,
        song_id: song_id
      })
    } else {
      submitSong({
        title: songTitle,
        lyrics: lyrics,
        publicUrl: music,
        storagePath: storagePath,
        photo,
        location,
        artist_name,
        finished: true,
      });
    }
    setFinished(true);
    setSuccess(true);
    setIsUpdating(false);
  }

  return (
    <div>
      {isLoading && <Loading title="Uploading Audio" />}
      {success ? (
        <div
          className="absolute w-full h-full bg-white text-wabsPurple flex flex-col gap-4 justify-start items-center pt-6"
          onClick={() => setSuccess(false)}
        >
          <FaCircleCheck className="fill-wabsSuccess" size={110} />
          Success!
          <p>Your song has been {finished ? "posted!" : "saved!"}</p>
          <Link className="w-[22rem]" to="/songs">
            <Button size="full" role="primary">
              Continue
            </Button>
          </Link>
        </div>
      ) : (
        <div></div>
      )}
      <form
        className="flex flex-col w-[22rem] m-auto items-start gap-4 pb-[10rem]"
        onSubmit={onSubmit}
      >
        <h2 className="text-xl">Write A Song!</h2>
        <InputField
          id="songTitle"
          type="text"
          value={songTitle}
          labelName="Song Title"
          onChange={(e) => setSongTitle(e.target.value)}
        />
        <textarea
          className="w-[22rem] resize-none h-[20rem] border border-wabsGray rounded-lg p-2"
          value={lyrics}
          onChange={(e) => setLyrics(e.target.value)}
        ></textarea>
        <div className="flex justify-between w-full">
          <div
            className="flex items-center underline gap-2 hover:cursor-pointer"
            onClick={onMusicIconClick}
          >
            {music ? (
              <>
                <div>Music Added!</div>
                <div className="text-xs" onClick={() => setMusic("")}>
                  (Change Music)
                </div>
              </>
            ) : (
              <>
                <IoMusicalNotesOutline />
                Add Music
              </>
            )}
          </div>
          <div
            className="flex items-center underline gap-2 hover:cursor-pointer"
            onClick={onSaveClick}
          >
            Save for later
            <IoMdSave />
          </div>
        </div>
        <input
          type="file"
          hidden
          accept=".mp3, .m4a"
          id="addMusic"
          onChange={handleUploadAudio}
        />
        <Button type="submit" role="primary" size="full">
          Submit
        </Button>
      </form>
    </div>
  );
}
