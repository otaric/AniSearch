import { gql } from 'graphql-request'

export const AniList = gql`
  query (
    $id: Int
    $page: Int
    $perPage: Int
    $search: String
    $type: MediaType
  ) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(id: $id, search: $search, type: $type) {
        id
        type
        title {
          romaji
          english
          native
        }
        coverImage {
          extraLarge
          large
          medium
        }
        startDate {
          day
          month
          year
        }
      }
    }
  }
`
