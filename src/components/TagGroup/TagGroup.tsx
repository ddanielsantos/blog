import React from 'react'
import { Flex } from '@chakra-ui/react'
import { Tag } from '../Tag/Tag'

type TagGroupProps = {
	tags: string[]
}
export function TagGroup(props: TagGroupProps) {
	return (
		<Flex gap={'2'}>
			{props.tags.map((e, i) => (
				<Tag key={i} content={e} my={'3'} />
			))}
		</Flex>
	)
}
