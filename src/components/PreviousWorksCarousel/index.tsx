import Carousel, { Alignment } from 'nuka-carousel'
import {
	Box,
	IconButton,
	Heading,
	Text,
	useBreakpointValue
} from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'

const styles = {
	flex: 1,
	padding: '1',
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
		<Box w={'100%'}>
			<Carousel
				wrapAround={true}
				autoplay
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
					<Heading>ola</Heading>
					<Text>
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea
						provident repellendus voluptatum reiciendis molestias minima
						pariatur nostrum officia dolor earum, fugiat vitae tempora omnis eos
						quisquam ipsam et? Qui, similique!
					</Text>
				</Box>
				<Box w={'100%'}>
					<Heading>ola</Heading>
				</Box>
				<Box w={'100%'}>
					<Heading>ola</Heading>
				</Box>
			</Carousel>
		</Box>
	)
}
