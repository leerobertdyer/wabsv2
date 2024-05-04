type PropsDefinition = {
  photo: string;
  artist: string;
  location: string;
  title: string;
  lyrics: string;
  audio: string;
};

export default function FeedCard(props: PropsDefinition) {
  const { photo, artist, location, title, lyrics, audio } = props;

  return (
    <div className="flex flex-col gap-2 p-4 border border-black rounded-lg w-[99%] overflow-hidden max-w-[25rem] m-auto">
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
        <audio controls src={audio} />
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
  );
}
