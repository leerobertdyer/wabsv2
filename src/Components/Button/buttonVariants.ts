import { FormEvent } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

export const button = tv({
	base: 'py-2 px-4 mt-2 mb-2 rounded-[2rem] h-[2.75rem] flex justify-center items-center border-none font-bold cursor-pointer transition-all duration-300 ease-in-out',
	variants: {
		role: {
			primary: 'bg-wabsPurple text-white hover:bg-[#a5a5a5] hover:text-black border-[1px]',
			secondary: 'bg-gray text-black hover:bg-black hover:text-gray border-[1px]',
		},
		size: {
			small: 'text-sm w-[60%] h-[1.75rem]',
			medium: 'text-[.875rem] w-[80%] h-[2.25rem]',
			full: 'w-full',
		},
	},
})

export type ButtonVariants = VariantProps<typeof button>

export type ButtonProps = Required<ButtonVariants> & {
	children: React.ReactNode
	onClick?: (e: FormEvent<HTMLButtonElement>) => void 
	type?: 'button' | 'submit' | 'reset'
}
