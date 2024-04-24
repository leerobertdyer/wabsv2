import { useState } from "react";
import Button from "../../Components/Button/Button";
import InputField from "../../Components/InputField/InputField";
import { IoMusicalNotesOutline } from "react-icons/io5";
import { IoMdSave } from "react-icons/io";
import { FaCircleCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function SubmitSong() {
  const [songTitle, setSongTitle] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [music, setMusic] = useState("");
  const [success, setSuccess] = useState(false);

  function onMusicIconClick() {
    document.getElementById("addMusic")?.click();
  }
  function handleSubmitMusic(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.files);
    setMusic("temp");
  }

  function onSaveClick() {
    console.log("saving but not really");
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!songTitle || !lyrics || !music) return;
    console.log(e.target);
    console.log(songTitle, lyrics, music);
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
          <p>Your song has been saved</p>
          <Link className="w-[22rem]" to="/profile">
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
          onChange={handleSubmitMusic}
        />
        <Button type="submit" role="primary" size="full">
          Submit
        </Button>
      </form>
    </div>
  );
}
