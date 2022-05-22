import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineLink,
  AiOutlineOrderedList,
  AiOutlineUnorderedList,
  AiOutlineUnderline,
  AiOutlineStrikethrough,
} from 'react-icons/ai'
import { RiDoubleQuotesL, RiHeading } from 'react-icons/ri'
import { BsCode, BsCodeSquare, BsCardImage } from 'react-icons/bs'
import { v4 as uuid } from 'uuid'
import supabase from '../../supabase'

import insertFormat from './utils/insertFormat'

function Toolbox() {
  const imageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      const { data, error } = await supabase.storage
        .from('images')
        .upload(`${uuid()}`, file)

      if (error) {
        throw error
      }
      if (data) {
        insertFormat(
          '![Image description](',
          `https://gcvuinboilazvaioqsxy.supabase.co/storage/v1/object/public/${data.Key}`,
          ')'
        )
      }
    }
  }

  return (
    <div className="flex w-full overflow-auto bg-gray-300 p-2">
      <input
        id="image-input"
        type="file"
        accept="image/png, image/jpeg"
        className="hidden"
        multiple={false}
        onChange={imageHandler}
      />
      <button className="md-icon" type="button">
        <AiOutlineBold size={20} />
      </button>
      <button className="md-icon" type="button">
        <AiOutlineItalic size={20} />
      </button>
      <button className="md-icon" type="button">
        <AiOutlineLink size={20} />
      </button>
      <button className="md-icon" type="button">
        <AiOutlineOrderedList size={20} />
      </button>
      <button className="md-icon" type="button">
        <AiOutlineUnorderedList size={20} />
      </button>
      <button className="md-icon" type="button">
        <RiHeading size={20} />
      </button>
      <button className="md-icon" type="button">
        <RiDoubleQuotesL size={20} />
      </button>
      <button className="md-icon" type="button">
        <BsCode size={20} />
      </button>
      <button className="md-icon" type="button">
        <BsCodeSquare size={20} />
      </button>
      <label htmlFor="image-input" className="md-icon">
        <BsCardImage size={20} />
      </label>
      <button className="md-icon" type="button">
        <AiOutlineUnderline size={20} />
      </button>
      <button className="md-icon" type="button">
        <AiOutlineStrikethrough size={20} />
      </button>
    </div>
  )
}

export default Toolbox
