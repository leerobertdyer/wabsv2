import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

type PropsDefinition = {
  photo: string;
  artist: string;
  location: string;
  title: string;
  lyrics: string;
  publicUrl: string;
  storagePath: string;
  id: string;
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
    id,
    handleDeleteSong,
  } = props;
  const [user_id, setUser_id] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    async function getId() {
      //get the user
      const { data } = await supabase.auth.getUser();
      if (data.user) setUser_id(data.user.id);
    }
    getId();
  }, []);

  function handleOnDeleteClick() {
    setIsDeleted(true);
    handleDeleteSong(publicUrl, storagePath);
  }

  return (
    <>
      {!isDeleted ?

      <div className="flex flex-col gap-2 p-4 border border-black rounded-lg w-[99%] overflow-hidden max-w-[25rem] m-auto">
        {user_id === id && (
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
            <h3>{location}</h3>
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
      </div>
      : null}
    </>
  );
}
