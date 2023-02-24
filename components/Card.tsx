/* eslint-disable @next/next/no-img-element */

interface Props {
  link: string;
  title: string;
  image: string;
}

export default function Card({ title, image, link }: Props) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer noopener"
      className="group flex flex-col"
    >
      <div className=" overflow-hidden text-neutral-50">
        <div className="aspect-w-3 aspect-h-4 min-h-[265px] min-w-[185px]">
          <img
            className="h-full w-full rounded-lg object-cover object-center"
            src={image}
            alt={`Poster Image of ${title}`}
          />
        </div>
      </div>

      <p className="w-full max-w-[192px] overflow-hidden text-ellipsis font-medium transition-all line-clamp-2 group-hover:text-rose-700">
        {title}
      </p>
    </a>
  );
}
