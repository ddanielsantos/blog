import { Box, Icon, Link } from '@chakra-ui/react'
import { FiGithub, FiLinkedin, FiMail, FiTwitter } from 'react-icons/fi'
import { RiDiscordLine } from 'react-icons/ri'
import NextLink from 'next/link'
import type { IconType } from 'react-icons'

type Handler = {
	href: string
	icon: IconType
}

const handlers: Handler[] = [
	{
		href: 'https://github.com/ddanielsantos',
		icon: FiGithub
	},
	{
		href: 'https://www.linkedin.com/in/daniel-santos-324855212/',
		icon: FiLinkedin
	},
	{
		href: 'mailto:contatodanieljob@gmail.com',
		icon: FiMail
	},
	{
		href: 'https://twitter.com/renat0sp',
		icon: FiTwitter
	},
	{
		href: 'https://discord.com/channels/@me/205830412923174912',
		icon: RiDiscordLine
	}
]

export const ContactsSection = () => {
	return (
		<Box>
			{handlers.map((handler, index) => {
				return (
					<NextLink key={index} passHref href={handler.href}>
						<Link isExternal>
							<Icon as={handler.icon} w={'6'} h={'6'} />
						</Link>
					</NextLink>
				)
			})}
		</Box>
	)
}
