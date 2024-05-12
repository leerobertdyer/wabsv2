export default function Loading({title}: {title: string}) {
  return (
    <div className="absolute top-0 left-0 justify-center items-center h-screen w-screen bg-[#0000009a] z-40">
      <div className="flex flex-col items-center justify-center h-full w-full">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
        <div className="text-white text-2xl">{title}</div>
      </div>
    </div>
  );
}
