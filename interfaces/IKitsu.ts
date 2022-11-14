export default interface IKitsu {
  id: string
  attributes: {
    titles: {
      en: string
      en_jp: string
      ja_jp: string
    }
    canonicalTitle: string
    posterImage: {
      tiny: string
      large: string
      small: string
      medium: string
      original: string
    }
    startDate: string
  }
}