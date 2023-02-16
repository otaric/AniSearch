import classNames from 'classnames'
import { FiSearch, FiSettings } from 'react-icons/fi'
import { Dispatch, SetStateAction, useState } from 'react'

interface Props {
  title: string
  setTitle: Dispatch<SetStateAction<string>>
  type: string
  setType: Dispatch<SetStateAction<string>>
  nsfw: boolean
  setNsfw: Dispatch<SetStateAction<boolean>>
  search: () => Promise<void>
}

export default function Form({
  title,
  setTitle,
  search,
  type,
  setType,
  nsfw,
  setNsfw
}: Props) {
  const [error, setError] = useState(false)
  const [menuConfig, setMenuConfig] = useState(false)
  return (
    <form
      className="flex items-center relative py-5"
      onSubmit={e => {
        e.preventDefault()
        setError(false)
        if (title === '') {
          setError(true)
          return
        }
        search()
      }}
    >
      <input
        className="w-72 text-left px-4 h-12 bg-neutral-50 border-2 focus:outline-none rounded-l-lg text-neutral-700 font-semibold"
        placeholder={`search a${type === 'anime' ? 'n' : ''} ${type} here!`}
        type="search"
        value={title}
        onChange={e => {
          setTitle(e.target.value)
        }}
      />
      <span
        className={classNames({
          'absolute -top-1': true,
          hidden: !error
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
      <div className="absolute right-2 -bottom-2 sm:hidden">
        <label className="accent-rose-700 space-x-2">
          <input
            type="checkbox"
            checked={nsfw}
            onChange={() => {
              setNsfw(!nsfw)
            }}
          />
          <span className="font-bold ">nsfw</span>
        </label>
      </div>
      <button className="flex h-12 items-center rounded-r-lg bg-rose-700 px-5 text-neutral-50 font-semibold">
        <span className="hidden lg:block">search</span>
        <span>
          <FiSearch className="text-2xl stroke-[3] lg:hidden" />
        </span>
      </button>
      <div className="relative hidden sm:block">
        <FiSettings
          className="ml-2 text-xl cursor-pointer"
          onClick={() => {
            setMenuConfig(!menuConfig)
          }}
        />

        <div
          className={classNames({
            'absolute bg-neutral-50 p-2 top-8 left-5 accent-rose-700 rounded-lg rounded-tl-none':
              true,
            "after:content-[''] after:w-0 after:h:0 after:border-b-8 after:border-r-8 after:absolute after:border-transparent after:border-b-neutral-50 after:-top-2 after:left-0":
              true,
            hidden: !menuConfig
          })}
        >
          <label className="flex space-x-2">
            <input
              type="checkbox"
              checked={nsfw}
              onChange={() => {
                setNsfw(!nsfw)
              }}
            />
            <span className="text-rose-700 font-bold">nsfw</span>
          </label>
        </div>
      </div>
    </form>
  )
}
