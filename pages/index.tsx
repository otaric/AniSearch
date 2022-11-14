import Head from 'next/head'
import { useState } from 'react'
import { request } from 'graphql-request'
import { Kitsu } from '../utils/kitsu/kitsu'
import { AniList } from '../utils/anilist/anilist'
import { MAL } from '../utils/mal/mal'
import AniListSection from '../components/sections/AniListSection'
import KitsuSection from '../components/sections/KitsuSection'
import MALSection from '../components/sections/MALSection'
import { FiSearch } from 'react-icons/fi'
import classNames from 'classnames'

export default function Home() {
  const [listKitsu, setListKitsu] = useState([])
  const [listAniList, setListAniList] = useState([])
  const [listMAL, setListMAL] = useState([])
  const [title, setTitle] = useState('naruto')
  const [type, setType] = useState('anime')
  const [error, setError] = useState(false)
  const [errorAniList, setErrorAniList] = useState(false)
  const [errorMAL, setErrorMAL] = useState(false)
  const [errorKitsu, setErrorKitsu] = useState(false)

  async function searchKitsu() {
    setListKitsu([])
    setErrorKitsu(false)
    let url = `${type}?filter[text]=${title}&page[limit]=6`
    Kitsu.get(url)
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
    let url = `${type}?q=${title}&limit=6`
    MAL.get(url)
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
    const endpoint = `https://graphql.anilist.co`
    const variables = {
      type: type.toUpperCase(),
      search: title,
      page: 1,
      perPage: 6
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
        <form
          className="flex relative py-5"
          onSubmit={e => {
            e.preventDefault()
            setError(false)
            if (title === '') {
              setError(true)
              return
            }
            searchKitsu()
            searchAnilist()
            searchMALAxios()
          }}
        >
          <input
            className="w-72 text-left px-4 h-12 bg-neutral-50 border-2 focus:outline-none rounded-l-lg text-neutral-700 font-semibold caret-rose-700"
            type="search"
            value={title}
            onChange={e => {
              setTitle(e.target.value)
            }}
          />
          <span
            className={classNames({
              'absolute -top-1': true,
              hidden: !error,
              block: error
            })}
          >
            type something in the search field!
          </span>

          <div className="space-x-2 absolute -bottom-2 accent-rose-700">
            <label>
              <input
                type="radio"
                value="anime"
                checked={type === 'anime'}
                onChange={e => {
                  setType(e.target.value)
                }}
              />
              <span className="pl-1">anime</span>
            </label>
            <label>
              <input
                type="radio"
                value="manga"
                checked={type === 'manga'}
                onChange={e => {
                  setType(e.target.value)
                }}
              />
              <span className="pl-1">manga</span>
            </label>
          </div>
          <button className="flex items-center rounded-r-lg bg-rose-700 px-5 text-neutral-50 font-semibold">
            <span className="hidden lg:block">search</span>
            <span>
              <FiSearch className="text-2xl stroke-[3] lg:hidden" />
            </span>
          </button>
        </form>
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
