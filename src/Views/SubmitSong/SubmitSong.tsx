import { useState } from "react";
import Button from "../../Components/Button/Button";
import InputField from "../../Components/InputField/InputField";
import { IoMusicalNotesOutline } from "react-icons/io5";
import { IoMdSave } from "react-icons/io";
import { FaCircleCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { submitSong } from "./helpers";
import { supabase } from "../../supabaseClient";

type PropsDefinition = {
  artistName: string
}

export default function SubmitSong({artistName}: PropsDefinition) {
  const [songTitle, setSongTitle] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [music, setMusic] = useState("");
  const [success, setSuccess] = useState(false);
  const [finished, setFinished] = useState(false);

  // Trigger audio input
  function onMusicIconClick() {
    document.getElementById("addMusic")?.click();
  }

  // Upload Audio File
  async function handleUploadAudio(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const fileName = artistName + Date.now()
    const {data, error} = await supabase.storage.from("songs").upload(`/${fileName}`, file);
    if (error) {
      alert(`Audio upload failed. Please try again. ${error.message}`);
      return;
    }
    if (data)
      {
        const {data} = supabase.storage.from("songs").getPublicUrl(`/${fileName}`);
        if (!data.publicUrl) return alert("Error getting public URL")
        setMusic(data.publicUrl);
      }
  }
  
  // Handle UNFINISHED song submission
  function onSaveClick() {
    if (!songTitle) return;
    submitSong({
      title: songTitle,
      lyrics: lyrics,
      audio: music,
      finished: false,
    });
    setSuccess(true);
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!songTitle || !lyrics || !music) return;
    submitSong({
      title: songTitle,
      lyrics: lyrics,
      audio: music,
      finished: true,
    });
    setFinished(true);
    setSuccess(true);
  }

  return (
    <div>
      {success ? (
        <div
          className="absolute w-full h-full bg-white text-wabsPurple flex flex-col gap-4 justify-start items-center pt-6"
          onClick={() => setSuccess(false)}
        >
          <FaCircleCheck className="fill-wabsSuccess" size={110} />
          Success!
          <p>Your song has been {finished ? 'posted!' : 'saved!'}</p>
          <Link className="w-[22rem]" to="/feed">
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
          placeholder="Bad Song #13"
          labelName="Song Title"
          onChange={(e) => setSongTitle(e.target.value)}
        />
        <textarea
          className="w-[22rem] resize-none h-[20rem] border border-wabsGray rounded-lg p-2"
          placeholder="
                Lyrics!
                More Lyrics!!
                And Even More Lyics!!!"
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
