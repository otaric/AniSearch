import IAniList from "../../interfaces/IAnilist";
import Card from "../Card";

interface Props {
  type: string;
  listAniList: never[];
}

export default function AniListSection({ listAniList, type }: Props) {
  return (
    <div className="m-auto flex max-w-fit flex-col">
      <h2 className=" pb-5 text-center text-3xl font-bold 2xl:text-left">
        ANILIST
      </h2>

      <div className="flex flex-wrap items-center justify-center gap-5">
        {listAniList.map((item: IAniList) => {
          const day = item.startDate.day ? `-${item.startDate.day}` : "";
          const month = item.startDate.month ? `-${item.startDate.month}` : "";
          const year = `${item.startDate.year}`;

          const date = year + month + day;

          return (
            <Card
              link={`https://anilist.co/${type}/${item.id}/`}
              key={item.id}
              image={item.coverImage.large}
              title={item.title.romaji}
              date={date}
            />
          );
        })}
      </div>
    </div>
  );
}
