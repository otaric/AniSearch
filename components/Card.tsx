import { FiExternalLink } from 'react-icons/fi'

interface Props {
  link: string
  title: string
  image: string
  date: string | number
}

export default function Card({ title, image, link, date }: Props) {
  return (
    <div className="bg-rose-700 rounded-lg text-neutral-50">
      <div className="flex gap-2 w-80 sm:w-60 min-[1535px]:w-52">
        <img
          className="h-36 w-[105px] object-cover rounded-l-lg"
          src={image}
          alt={`Poster Image of ${title}`}
        />
        <div className="w-52 h-full sm:w-28 min-[1535px]:w-24 relative">
          <p
            className="text-ellipsis overflow-hidden w-full whitespace-nowrap font-medium"
            title={title}
          >
            {title}
          </p>
          <p>{date}</p>

          <div className="w-min cursor-pointer absolute -bottom-20 right-2">
            <a href={link} target="_blank" rel="noreferrer noopener">
              <FiExternalLink className="text-2xl sm:text-xl lg:text-lg" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
