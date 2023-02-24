import IMAL from "../../interfaces/IMAL";
import Card from "../Card";

interface Props {
  type: string;
  listMAL: never[];
}

export default function MALSection({ listMAL, type }: Props) {
  return (
    <div className="m-auto flex max-w-fit flex-col">
      <h2 className="pb-5 text-center text-3xl font-bold 2xl:text-left">MAL</h2>

      <div className="flex flex-wrap items-center justify-center gap-5">
        {listMAL.map((item: IMAL) => {
          let day = ``;
          let month = ``;
          let year = ``;
          if (item.aired) {
            day = item.aired.prop.from.day
              ? `-${item.aired.prop.from.day}`
              : "";
            month = item.aired.prop.from.month
              ? `-${item.aired.prop.from.month}`
              : "";
            year = item.aired.prop.from.year
              ? `${item.aired.prop.from.year}`
              : "";
          } else {
            day = item.published.prop.from.day
              ? `-${item.published.prop.from.day}`
              : "";
            month = item.published.prop.from.month
              ? `-${item.published.prop.from.month}`
              : "";
            year = item.published.prop.from.year
              ? `${item.published.prop.from.year}`
              : "";
          }

          const date = year + month + day;

          return (
            <Card
              link={`https://myanimelist.net/${type}/${item.mal_id}`}
              key={item.mal_id}
              image={item.images.jpg.large_image_url}
              title={item.title}
              date={date}
            />
          );
        })}
      </div>
    </div>
  );
}
