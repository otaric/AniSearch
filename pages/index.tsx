import Head from "next/head";
import { useState } from "react";
import { request } from "graphql-request";
import { Kitsu } from "../utils/kitsu/kitsu";
import { AniList, endpoint } from "../utils/anilist/anilist";
import { MAL } from "../utils/mal/mal";
import AniListSection from "../components/sections/AniListSection";
import KitsuSection from "../components/sections/KitsuSection";
import MALSection from "../components/sections/MALSection";
import Form from "../components/Form";
import NoResults from "../components/NoResults";

export default function Home() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("anime");
  const [nsfw, setNsfw] = useState(false);

  const [listKitsu, setListKitsu] = useState([]);
  const [listAniList, setListAniList] = useState([]);
  const [listMAL, setListMAL] = useState([]);

  const [init, setInit] = useState(true);

  async function searchKitsu() {
    setListKitsu([]);
    let url = `${type}?`;
    Kitsu.get(url, {
      params: {
        "filter[text]": title,
        "[page[limit]]": 6,
      },
    })
      .then((data) => {
        setListKitsu(data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function searchMALAxios() {
    setListMAL([]);
    let url = `${type}`;
    MAL.get(url, {
      params: {
        q: title,
        limit: 6,
        ...(!nsfw ? { sfw: true } : {}),
      },
    })
      .then((data) => {
        setListMAL(data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function searchAnilist() {
    const variables = {
      type: type.toUpperCase(),
      search: title,
      page: 1,
      perPage: 6,
      ...(nsfw ? {} : { isAdult: false }),
    };
    setListAniList([]);
    await request(endpoint, AniList, variables)
      .then((data) => {
        setListAniList(data.Page.media);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function search() {
    await searchKitsu();
    await searchAnilist();
    await searchMALAxios();
    setInit(false);
  }

  return (
    <>
      <Head>
        <title>AniSearch</title>
        <link rel="shortcut icon" href="/logo.svg" />
      </Head>
      <div className="container mx-auto	px-4 text-neutral-50 xl:px-0">
        <h1 className="py-5 text-center text-4xl font-bold">
          Ani<span className="text-rose-700">Search</span>
        </h1>
      </div>

      <div className="container mx-auto flex justify-center px-4 text-neutral-50">
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

      <div className="container mx-auto space-y-10 py-10 px-4 text-neutral-50">
        {listAniList.length === 0 ? null : (
          <AniListSection type={type} listAniList={listAniList} />
        )}

        {listMAL.length === 0 ? null : (
          <MALSection type={type} listMAL={listMAL} />
        )}

        {listKitsu.length === 0 ? null : (
          <KitsuSection type={type} listKitsu={listKitsu} />
        )}

        {listAniList.length === 0 &&
          listKitsu.length === 0 &&
          listMAL.length === 0 &&
          !init && <NoResults />}
      </div>
    </>
  );
}
