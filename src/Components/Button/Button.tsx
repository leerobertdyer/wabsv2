import { ButtonProps, button } from './buttonVariants'

export default function Button(props: ButtonProps) {
	return <button className={button(props)} onClick={props.onClick}>{props.children}</button>
}
