export type Buddy ={
        photo: string;
        name: string;
        location: string;
    };

export default function BuddyCard(buddy: Buddy) {
  return (
    <div className="flex flex-col items-center gap-2 p-2 bg-wabsPurple text-white rounded-lg">
        <div
            className="rounded-full bg-gray-200 h-12 w-12"
            style={{
            backgroundImage: `url(${buddy.photo})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            }}></div>
      <h4>{buddy.name}</h4>
      <p>{buddy.location}</p>
    </div>
  );
}