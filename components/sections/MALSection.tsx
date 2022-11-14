import IMAL from '../../interfaces/IMAL'
import Card from '../Card'
import NoResults from '../NoResults'

interface Props {
  type: string
  listMAL: never[]
  error: boolean
}

export default function MALSection({ listMAL, type, error }: Props) {
  return (
    <div className="flex flex-col max-w-fit m-auto">
      <h2 className="pb-5 font-bold text-3xl text-center 2xl:text-left">MAL</h2>

      {error && <NoResults />}

      <div className="flex flex-wrap items-center justify-center gap-5">
        {listMAL.map((item: IMAL) => {
          let day = ``
          let month = ``
          let year = ``
          if (item.aired) {
            day = item.aired.prop.from.day ? `-${item.aired.prop.from.day}` : ''
            month = item.aired.prop.from.month
              ? `-${item.aired.prop.from.month}`
              : ''
            year = item.aired.prop.from.year
              ? `${item.aired.prop.from.year}`
              : ''
          } else {
            day = item.published.prop.from.day
              ? `-${item.published.prop.from.day}`
              : ''
            month = item.published.prop.from.month
              ? `-${item.published.prop.from.month}`
              : ''
            year = item.published.prop.from.year
              ? `${item.published.prop.from.year}`
              : ''
          }

          const date = year + month + day

          return (
            <Card
              link={`https://myanimelist.net/${type}/${item.mal_id}`}
              key={item.mal_id}
              image={item.images.jpg.large_image_url}
              title={item.title}
              date={date}
            />
          )
        })}
      </div>
    </div>
  )
}
