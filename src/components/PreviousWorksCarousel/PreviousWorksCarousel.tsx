import Carousel, { Alignment } from 'nuka-carousel'
import {
	Box,
	IconButton,
	Heading,
	Link,
	Text,
	useBreakpointValue
} from '@chakra-ui/react'
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	ExternalLinkIcon
} from '@chakra-ui/icons'
import NextLink from 'next/link'

const styles = {
	flex: 1,
	size: 'xs',
	borderRadius: '7px',
	fontSize: 'sm',
	fontWeight: 'bold',
	transition: 'background-color 0.3s',
	border: `2px solid black`,
	_hover: {
		color: 'white',
		bg: 'black'
	}
}

export const PreviousWorksCarousel = () => {
	const padding = useBreakpointValue(['2rem', '3rem'])

	return (
		<Box w={'100%'} margin={'auto'}>
			<Carousel
				wrapAround={true}
				autoplayInterval={5000}
				cellSpacing={30}
				cellAlign={Alignment.Center}
				dragging={false}
				slidesToShow={1}
				style={{ padding }}
				adaptiveHeight={false}
				renderCenterLeftControls={({ previousSlide }) => (
					<IconButton
						aria-label='previous slide'
						{...styles}
						onClick={previousSlide}
					>
						<ChevronLeftIcon />
					</IconButton>
				)}
				renderBottomCenterControls={({ currentSlide, slideCount }) => (
					<div>
						{currentSlide + 1} of {slideCount}
					</div>
				)}
				renderCenterRightControls={({ nextSlide }) => (
					<IconButton aria-label='next slide' {...styles} onClick={nextSlide}>
						<ChevronRightIcon />
					</IconButton>
				)}
				animation='zoom'
				speed={1500}
			>
				<Box w={'100%'}>
					<Heading fontWeight={'medium'}>
						React Native Developer @ Pará State University
					</Heading>
					<Text>
						Worked on the planning, the development, and the deploy of{' '}
						<NextLink
							href={
								'https://play.google.com/store/apps/details?id=com.inovacom.dica60'
							}
							passHref
						>
							<Link isExternal textDecor={'underline'}>
								Dica60+ <ExternalLinkIcon />
							</Link>
						</NextLink>
						, a mobile app focused on helping elderly people of Belém to find
						social and health services.
					</Text>
				</Box>
				<Box w={'100%'}>
					<Heading fontWeight={'medium'}>
						ERP Maintainer - Intern @ Petruz Fruity
					</Heading>
					<Text>
						Worked on the ERP, creating and maintaining the SQL queries used on
						it, I also started a the development of a Rest API, using NodeJS, to
						communicate between the ERP and PowerBI.
					</Text>
				</Box>
			</Carousel>
		</Box>
	)
}
