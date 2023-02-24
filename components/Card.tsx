import { FiExternalLink } from "react-icons/fi";

interface Props {
  link: string;
  title: string;
  image: string;
  date: string | number;
}

export default function Card({ title, image, link, date }: Props) {
  return (
    <div className="relative overflow-hidden rounded-lg bg-rose-700 text-neutral-50">
      <div className="flex w-80 gap-2 sm:w-60 min-[1535px]:w-52">
        <img
          className="h-36 w-[105px] object-cover object-center"
          src={image}
          alt={`Poster Image of ${title}`}
        />
        <div className="h-full w-52 sm:w-28 min-[1535px]:w-24">
          <p
            className="w-full overflow-hidden text-ellipsis whitespace-nowrap font-medium"
            title={title}
          >
            {title}
          </p>
          <p>{date}</p>
        </div>
      </div>
      <div className="absolute bottom-2 right-2 w-min cursor-pointer">
        <a href={link} target="_blank" rel="noreferrer noopener">
          <FiExternalLink className="text-2xl sm:text-xl lg:text-lg" />
        </a>
      </div>
    </div>
  );
}
