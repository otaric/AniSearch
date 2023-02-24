import IKitsu from "../../interfaces/IKitsu";
import Card from "../Card";

interface Props {
  type: string;
  listKitsu: never[];
}

export default function KitsuSection({ listKitsu, type }: Props) {
  return (
    <div className="m-auto flex max-w-fit flex-col">
      <h2 className="pb-5 text-center text-3xl font-bold 2xl:text-left">
        KITSU
      </h2>

      <div className="flex flex-wrap items-center justify-center gap-5">
        {listKitsu.map((item: IKitsu) => {
          const date = item.attributes.startDate;
          return (
            <Card
              link={`https://kitsu.io/${type}/${item.id}`}
              key={item.id}
              image={item.attributes.posterImage.medium}
              title={item.attributes.canonicalTitle}
              date={date}
            />
          );
        })}
      </div>
    </div>
  );
}
