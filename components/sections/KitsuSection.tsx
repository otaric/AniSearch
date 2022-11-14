import IKitsu from '../../interfaces/IKitsu'
import Card from '../Card'
import NoResults from '../NoResults'

interface Props {
  type: string
  listKitsu: never[]
  error: boolean
}

export default function KitsuSection({ listKitsu, type, error }: Props) {
  return (
    <div className="flex flex-col max-w-fit m-auto">
      <h2 className="pb-5 font-bold text-3xl text-center 2xl:text-left">
        KITSU
      </h2>

      {error && <NoResults />}

      <div className="flex flex-wrap items-center justify-center gap-5">
        {listKitsu.map((item: IKitsu) => {
          const date = item.attributes.startDate
          return (
            <Card
              link={`https://kitsu.io/${type}/${item.id}`}
              key={item.id}
              image={item.attributes.posterImage.medium}
              title={item.attributes.canonicalTitle}
              date={date}
            />
          )
        })}
      </div>
    </div>
  )
}
