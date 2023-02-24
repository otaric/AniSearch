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
      className="group flex max-w-[148px] flex-col sm:max-w-[185px] "
    >
      <div className="overflow-hidden text-neutral-50">
        <img
          className="h-[212px] w-[148px] rounded-lg object-cover object-center sm:h-[265px] sm:w-[185px] "
          src={image}
          alt={`Cover Image of ${title}`}
        />
      </div>

      <p className="w-full overflow-hidden text-ellipsis font-medium transition-all line-clamp-2 group-hover:text-rose-700">
        {title}
      </p>
    </a>
  );
}
