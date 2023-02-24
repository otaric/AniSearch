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

      <div className="flex flex-wrap justify-center gap-5">
        {listMAL.map((item: IMAL) => {
          return (
            <Card
              link={`https://myanimelist.net/${type}/${item.mal_id}`}
              key={item.mal_id}
              image={item.images.jpg.large_image_url}
              title={item.title}
            />
          );
        })}
      </div>
    </div>
  );
}
