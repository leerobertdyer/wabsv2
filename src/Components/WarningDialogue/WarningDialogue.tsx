type PropsDefinition = {
    yesCallback?: () => void;
    noCallback?: () => void;
}

export default function WarningDialogue(props: PropsDefinition) {
  return (
    <div className="absolute w-full h-[150vh] z-50 top-0 left-0 bg-[#aaa9a9a9] text-black">
      <div className="flex flex-col justify-center items-center gap-3 h-[25%] w-[50%] mx-auto mt-[13%] bg-wabsPurple border-black border-2 rounded-lg">
        <span className="bg-black p-4 text-white w-[40%] text-center rounded-xl">
            Warning!
            </span>
            Are you sure you want to delete this song?
        <div className="flex justify-center items-center w-full gap-3">
          <button 
          className="text-black border w-[7rem] border-black bg-white rounded-xl hover:bg-black hover:text-white hover:border-white"
          onClick={props.yesCallback}>
            Yes
          </button>
          <button 
          className="text-black border w-[7rem] border-black bg-white rounded-xl hover:bg-black hover:text-white hover:border-white"
          onClick={props.noCallback}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}
