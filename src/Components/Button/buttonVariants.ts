import { FormEvent } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

export const button = tv({
	base: 'py-2 px-4 mt-2 mb-2 rounded-[8px] h-[2.75rem] flex justify-center items-center font-bold cursor-pointer transition-all duration-300 ease-in-out',
	variants: {
		role: {
			primary: 'bg-wabsPurple text-white hover:bg-[#a5a5a5] hover:text-black border-[1px]',
			secondary: 'bg-gray text-wabsPurple hover:bg-wabsGray hover:border-none hover:text-black border-[1px] border border-2 border-wabsPurple',
		},
		size: {
			small: 'text-sm w-[7rem]',
			medium: 'text-[.875rem] w-[80%] m-auto',
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
