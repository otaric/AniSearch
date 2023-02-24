import { gql } from "graphql-request";

export const endpoint = `https://graphql.anilist.co`;

export const AniList = gql`
  query (
    $page: Int
    $perPage: Int
    $search: String
    $type: MediaType
    $isAdult: Boolean
  ) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(search: $search, type: $type, isAdult: $isAdult) {
        id
        type
        isAdult
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
`;
