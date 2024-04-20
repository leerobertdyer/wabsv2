import { FormEvent } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

export const button = tv({
	base: 'py-2 px-4 mt-2 mb-2 rounded-3xl',
	variants: {
		role: {
			primary: 'bg-black text-white hover:bg-white hover:text-black border-[1px]',
			secondary: 'bg-gray text-black hover:bg-black hover:text-gray border-[1px]',
		},
		size: {
			small: 'text-sm w-[8.75rem] h-[1.75rem]',
			medium: 'text-[.875rem] w-[80%] h-[2.5rem]',
			full: 'w-full',
		},
	},
})

export type ButtonVariants = VariantProps<typeof button>

export type ButtonProps = Required<ButtonVariants> & {
	children: React.ReactNode
	onClick: (e: FormEvent<HTMLButtonElement>) => void 
}
