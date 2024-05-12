type PropsDefinition = {
    message: string;
    yesCallback?: () => void;
    noCallback?: () => void;
}

export default function WarningDialogue(props: PropsDefinition) {
  return (
    <div className="absolute w-full h-[150vh] z-50 top-0 left-0 bg-[#aaa9a9a9] text-black">
      <div className="
      flex flex-col 
      justify-center items-center 
      gap-3 h-[15rem] w-[30rem] 
      mx-auto mt-[13%] 
      border-black border-[1px] 
      drop-shadow-md
      bg-white
      rounded-lg">
        <span className="w-[40%] text-center">
            Delete Song
            </span>
          {props.message}
        <div className="flex flex-col justify-center items-center w-full gap-3">
          <button 
          className="
          text-white 
          w-[7rem] h-[2.45rem]
          bg-wabsError 
          rounded-md"
          onClick={props.yesCallback}>
            Delete
          </button>
          <p 
          className="text-wabsLink hover:cursor-pointer"
          onClick={props.noCallback}>
            Cancel
          </p>
        </div>
      </div>
    </div>
  );
}
