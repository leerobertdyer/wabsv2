import { Song } from "../../Views/Songs/Songs";
import { IoMusicalNotesOutline } from "react-icons/io5";

type PropsDefinition = {
    song: Song;
    handleRemoveSong: (id: number, finished: boolean) => void;    
};

export default function SongCard(props: PropsDefinition) {
  const {song, handleRemoveSong } = props;
  return (
    <div
      key={song.id}
      className="
      w-[45%]
      relative
    rounded-lg 
    text-wabsPurple
    flex
    flex-col
    items-center
    justify-center
    border
    border-wabsGray
    mb-8
    max-w-[18rem]
    p-6
    gap-3"
    >
        <p className="text-[2.5rem] absolute top-0 right-4 text-wabsPurple hover:cursor-pointer"
        onClick={() => handleRemoveSong(song.id, song.finished)}>x</p>
        <IoMusicalNotesOutline className="fill-wabsPurple" size={40}/>
      <h1 className="w-fit text-center">{song.title}</h1>
      <h2 className="w-fit text-center text-xs">Started: {song.started}</h2>
      <p className="w-fit text-center text-xs">{song.finished ? `Finished: ${song.finished}` : ''}</p>
    </div>
  );
}
