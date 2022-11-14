import IAniList from '../../interfaces/IAnilist'
import Card from '../Card'
import NoResults from '../NoResults'

interface Props {
  type: string
  listAniList: never[]
  error: boolean
}

export default function AniListSection({ listAniList, type, error }: Props) {
  return (
    <div className="flex flex-col max-w-fit m-auto">
      <h2 className=" pb-5 font-bold text-3xl text-center 2xl:text-left">
        ANILIST
      </h2>

      {error && <NoResults />}

      <div className="flex flex-wrap items-center justify-center gap-5">
        {listAniList.map((item: IAniList) => {
          const day = item.startDate.day ? `-${item.startDate.day}` : ''
          const month = item.startDate.month ? `-${item.startDate.month}` : ''
          const year = `${item.startDate.year}`

          const date = year + month + day

          return (
            <Card
              link={`https://anilist.co/${type}/${item.id}/`}
              key={item.id}
              image={item.coverImage.large}
              title={item.title.romaji}
              date={date}
            />
          )
        })}
      </div>
    </div>
  )
}
