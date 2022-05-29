import {
	AiOutlineBold,
	AiOutlineItalic,
	AiOutlineLink,
	AiOutlineOrderedList,
	AiOutlineUnorderedList,
	AiOutlineUnderline,
	AiOutlineStrikethrough,
} from 'react-icons/ai';
import { RiDoubleQuotesL, RiHeading } from 'react-icons/ri';
import { BsCode, BsCodeSquare, BsCardImage } from 'react-icons/bs';
import { ButtonGroup, IconButton, Input, Tooltip } from '@chakra-ui/react';
import { v4 as uuid } from 'uuid';

import supabase from '../../supabase';

type Props = {
	target: React.RefObject<HTMLTextAreaElement>;
};

function Toolbox({ target }: Props) {
	const imageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const file = e.target.files[0];
			const { data, error } = await supabase.storage
				.from('images')
				.upload(`${uuid()}`, file);

			if (error) throw error;
			// if (data) {
			//   insertFormat(
			//     '![Image description](',
			//     `https://gcvuinboilazvaioqsxy.supabase.co/storage/v1/object/public/${data.Key}`,
			//     ')'
			//   )
			// }
			e.target.value = '';
		}
	};

	return (
		<ButtonGroup
			spacing={0}
			w="full"
			overflowX="auto"
			pb="4"
			pt="2"
			variant="ghost"
		>
			<Input
				onChange={imageHandler}
				id="image"
				type="file"
				accept="image/png, image/jpeg"
				display="none"
			/>
			<Tooltip label="Bold" placement="bottom" hasArrow>
				<IconButton aria-label="bold" icon={<AiOutlineBold />} />
			</Tooltip>
			<Tooltip label="Italic" placement="bottom" hasArrow>
				<IconButton aria-label="italic" icon={<AiOutlineItalic />} />
			</Tooltip>
			<Tooltip label="Link" placement="bottom" hasArrow>
				<IconButton aria-label="link" icon={<AiOutlineLink />} />
			</Tooltip>
			<Tooltip label="Ordered list" placement="bottom" hasArrow>
				<IconButton
					aria-label="ordered list"
					icon={<AiOutlineOrderedList />}
					disabled
				/>
			</Tooltip>
			<Tooltip label="Unordered list" placement="bottom" hasArrow>
				<IconButton
					aria-label="unordered list"
					icon={<AiOutlineUnorderedList />}
					disabled
				/>
			</Tooltip>
			<Tooltip label="Heading" placement="bottom" hasArrow>
				<IconButton aria-label="heading" icon={<RiHeading />} disabled />
			</Tooltip>
			<Tooltip label="Quote" placement="bottom" hasArrow>
				<IconButton aria-label="Quote" icon={<RiDoubleQuotesL />} disabled />
			</Tooltip>
			<Tooltip label="Code" placement="bottom" hasArrow>
				<IconButton aria-label="Code" icon={<BsCode />} disabled />
			</Tooltip>
			<Tooltip label="Code square" placement="bottom" hasArrow>
				<IconButton aria-label="code square" icon={<BsCodeSquare />} disabled />
			</Tooltip>
			<Tooltip label="Image" placement="bottom" hasArrow>
				<IconButton
					as="label"
					htmlFor="image"
					aria-label="image"
					icon={<BsCardImage />}
				/>
			</Tooltip>
			<Tooltip label="Underline" placement="bottom" hasArrow>
				<IconButton aria-label="underline" icon={<AiOutlineUnderline />} />
			</Tooltip>
			<Tooltip label="Strike through" placement="bottom" hasArrow>
				<IconButton aria-label="strike through" icon={<AiOutlineStrikethrough />} />
			</Tooltip>
		</ButtonGroup>
	);
}

export default Toolbox;
