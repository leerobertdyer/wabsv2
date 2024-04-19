type BasicInputType = "text" | "password" | "email" | "checkbox" | "file"

type PropsDefinition = {
    id: string
    type: BasicInputType
    labelName: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    required?: boolean
}

export default function InputField(props: PropsDefinition) {
    return (
        <div className="flex flex-col items-start w-full pb-3">
            <label className="text-[.875rem]" htmlFor={props.id}>{props.labelName}</label>
            <input
                className={'w-full h-[2.5rem] border-[1px] border-gray rounded-[4px]'}
                type={props.type}
                id={props.id}
                onChange={props.onChange}
                required={props.required}
            />
        </div>
    )
}