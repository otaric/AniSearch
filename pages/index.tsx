import Head from 'next/head'
import { useState } from 'react'
import { request } from 'graphql-request'
import { Kitsu } from '../utils/kitsu/kitsu'
import { AniList, endpoint } from '../utils/anilist/anilist'
import { MAL } from '../utils/mal/mal'
import AniListSection from '../components/sections/AniListSection'
import KitsuSection from '../components/sections/KitsuSection'
import MALSection from '../components/sections/MALSection'
import Form from '../components/Form'

export default function Home() {
  const [title, setTitle] = useState('')
  const [type, setType] = useState('anime')
  const [nsfw, setNsfw] = useState(false)

  const [listKitsu, setListKitsu] = useState([])
  const [listAniList, setListAniList] = useState([])
  const [listMAL, setListMAL] = useState([])
  
  const [errorAniList, setErrorAniList] = useState(false)
  const [errorMAL, setErrorMAL] = useState(false)
  const [errorKitsu, setErrorKitsu] = useState(false)

  async function searchKitsu() {
    setListKitsu([])
    setErrorKitsu(false)
    let url = `${type}?`
    Kitsu.get(url, {
      params: {
        'filter[text]': title,
        '[page[limit]]': 6
      }
    })
      .then(data => {
        if (data.data.data.length === 0) {
          setErrorKitsu(true)
        }
        setListKitsu(data.data.data)
      })
      .catch(error => {
        console.log(error)
        setErrorKitsu(true)
      })
  }

  async function searchMALAxios() {
    setListMAL([])
    setErrorMAL(false)
    let url = `${type}`
    MAL.get(url, {
      params: {
        q: title,
        limit: 6,
        ...(!nsfw ? { sfw: true } : {})
      }
    })
      .then(data => {
        if (data.data.data.length === 0) {
          setErrorMAL(true)
        }
        setListMAL(data.data.data)
      })
      .catch(error => {
        console.log(error)
        setErrorMAL(true)
      })
  }

  async function searchAnilist() {
    const variables = {
      type: type.toUpperCase(),
      search: title,
      page: 1,
      perPage: 6,
      ...(nsfw ? {} : { isAdult: false })
    }
    setListAniList([])
    setErrorAniList(false)
    await request(endpoint, AniList, variables)
      .then(data => {
        if (data.Page.media.length === 0) {
          setErrorAniList(true)
        }
        setListAniList(data.Page.media)
      })
      .catch(error => {
        console.log(error)
        setErrorAniList(true)
      })
  }

  async function search() {
    await searchKitsu()
    await searchAnilist()
    await searchMALAxios()
  }

  return (
    <>
      <Head>
        <title>AniSearch</title>
        <link rel="shortcut icon" href="/logo.svg" />
      </Head>
      <div className="text-neutral-50 container	mx-auto px-4 xl:px-0">
        <h1 className="text-4xl font-bold text-center py-5">
          Ani<span className="text-rose-700">Search</span>
        </h1>
      </div>

      <div className="flex justify-center container mx-auto text-neutral-50 px-4">
        <Form
          title={title}
          setTitle={setTitle}
          type={type}
          setType={setType}
          nsfw={nsfw}
          setNsfw={setNsfw}
          search={search}
        />
      </div>

      <div className="container mx-auto py-10 space-y-10 text-neutral-50 px-4">
        <AniListSection
          error={errorAniList}
          type={type}
          listAniList={listAniList}
        />

        <MALSection error={errorMAL} type={type} listMAL={listMAL} />

        <KitsuSection error={errorKitsu} type={type} listKitsu={listKitsu} />
      </div>
    </>
  )
}
