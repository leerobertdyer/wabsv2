type BasicInputType = "text" | "password" | "email" | "checkbox" | "file";

type PropsDefinition = {
  id: string;
  type: BasicInputType;
  labelName: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};

export default function InputField(props: PropsDefinition) {
  return (
    <div
      className={
        props.type === "checkbox"
          ? "flex flex-row-reverse w-full justify-end items-center gap-5"
          : "flex flex-col items-start w-full pb-3"
      }
    >
      <label className="text-[.875rem]" htmlFor={props.id}>
        {props.labelName}
      </label>
      <input
        className={
          props.type === "checkbox"
            ? "w-[1.5rem] h-[1.5rem]"
            : "w-full h-[2.5rem] border-[1px] border-gray rounded-[4px] p-2 text-[.75rem]"
        }
        type={props.type}
        id={props.id}
        onChange={props.onChange}
        required={props.required}
        placeholder={props.placeholder}
      />
    </div>
  );
}
