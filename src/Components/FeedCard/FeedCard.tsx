import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import WarningDialogue from "../WarningDialogue/WarningDialogue";
import { useNavigate } from "react-router-dom";

type PropsDefinition = {
  photo: string;
  artist: string;
  location: string;
  title: string;
  lyrics: string;
  publicUrl: string;
  storagePath: string;
  user_id: string;
  song_id: number;
  handleDeleteSong: (publicUrl: string, storagePath: string) => Promise<void>;
};

export default function FeedCard(props: PropsDefinition) {
  const {
    photo,
    artist,
    location,
    title,
    lyrics,
    publicUrl,
    storagePath,
    user_id,
    song_id,
    handleDeleteSong,
  } = props;
  const [currentUserId, setCurrentUserId] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const navigate = useNavigate()

  useEffect(() => {
    async function getId() {
      //get the user
      const { data } = await supabase.auth.getUser();
      if (data.user) setCurrentUserId(data.user.id);
    }
    getId();
  }, []);

  function handleOnDeleteClick() {
    setShowWarning(true);
  }
  
  function handleCommitDelete() {
    setIsDeleted(true);
    setShowWarning(false);
    handleDeleteSong(publicUrl, storagePath);
  }

  function handleOnEditClick() {
    if (!song_id) return;
    const encodedLyrics = encodeURIComponent(lyrics);
    const url = `/submit-song?edit=true&photo=${photo}&artist=${artist}&location=${location}&title=${title}&lyrics=${encodedLyrics}&publicUrl=${publicUrl}&storagePath=${storagePath}&user_id=${user_id}&song_id=${song_id}`;
    navigate(url)
  }

  return (
    <>
    {showWarning && WarningDialogue({message: "  Are you sure you want to delete your song?", yesCallback: handleCommitDelete, noCallback: () => setShowWarning(false)})}
      {!isDeleted ?

      <div className="flex flex-col gap-2 p-4 border border-black rounded-lg w-[99%] overflow-hidden max-w-[25rem] m-auto">
        {currentUserId === user_id && (
          <div className="relative">
            <div
              className="absolute right-0 hover:text-red-600 hover:cursor-pointer"
              onClick={() => handleOnDeleteClick()}
            >
              X
            </div>
          </div>
        )}
        <div className="flex items-center justify-start">
          <img
            src={photo}
            alt="artist"
            className="rounded-full w-12 h-12 overflow-hidden"
          />
          <div className="p-2">
            <h2>{artist}</h2>
            <h3 className="text-wabsPurple"><span className="px-2 text-xs">from</span>{location}</h3>
          </div>
        </div>
        <div className="bg-wabsPurple p-4 rounded-full">
          <audio controls src={publicUrl} />
        </div>
        <details>
          <summary>
            <span className="font-bold text-[.8rem]">{title}</span>
          </summary>
          <pre className="bg-wabsPurple text-white p-4 rounded-lg text-[.65rem]">
            {lyrics}
          </pre>
        </details>
        {currentUserId === user_id && (
          <div className="relative">
            <div
              className="absolute right-0 bottom-0 text-wabsPurple hover:text-wabsLink hover:cursor-pointer"
              onClick={() => handleOnEditClick()}
            >
              Edit
            </div>
          </div>
        )}
      </div>
      : null}
    </>
  );
}
