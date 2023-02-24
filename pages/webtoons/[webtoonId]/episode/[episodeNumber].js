import { gql } from "@apollo/client";
import client from "../../../../apollo";
import Seo from "../../../../comps/layout/SEO";
import Nav from "../../../../comps/webtoonEpisode/Nav";
import hideOrPaint from "../../../../utils/hideOrPaint";
import CurrentEpisode from "../../../../comps/webtoonEpisode/EngEpisode";
import Buttons from "../../../../comps/webtoonEpisode/Buttons";
import EngEpisode from "../../../../comps/webtoonEpisode/EngEpisode";
import { useEffect, useState } from "react";
import KorEpisode from "../../../../comps/webtoonEpisode/KorEpisode";
const GET_EPISODE_DATA = gql`
  query Webtoon($webtoonId: String) {
    webtoons(filters: { webtoon_id: { eq: $webtoonId } }) {
      data {
        id
        attributes {
          webtoon_id
          title
          cover_image {
            data {
              attributes {
                url
              }
            }
          }
          episodes(pagination: { limit: 200 }) {
            data {
              id
              attributes {
                episode_number
                eng_image {
                  data {
                    attributes {
                      width
                      height
                      url
                    }
                  }
                }
                kor_image {
                  data {
                    attributes {
                      width
                      height
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export async function getServerSideProps(context) {
  const { webtoonId, episodeNumber } = context.query;
  const {
    data: { webtoons },
  } = await client.query({
    query: GET_EPISODE_DATA,
    variables: {
      webtoonId: webtoonId,
    },
  });
  const webtoon = webtoons.data[0];
  const episodes = webtoon.attributes.episodes.data;
  const episode = episodes.find(
    (item) => item.attributes.episode_number === parseInt(episodeNumber)
  );
  const prevUrl = context.req.headers.referer;
  return {
    props: {
      prevUrl: prevUrl || null,
      webtoon: webtoon,
      episode: episode.attributes,
      allEpisodes: episodes
        .slice()
        .sort(
          (a, b) => a.attributes.episode_number - b.attributes.episode_number
        ),
    },
  };
}

export default function Episode({ webtoon, episode, allEpisodes, prevUrl }) {
  //Hide navbar and navgation buttons on scroll
  hideOrPaint();

  //Set episode language
  const [lang, setLang] = useState(false);

  useEffect(() => {
    const storedLang = localStorage.getItem("episodeLang");
    if (storedLang === "true") {
      setLang(true);
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Seo
        title={`${webtoon.attributes.title} - Ep.${episode.episode_number}`}
      />
      <Nav
        episode={episode}
        webtoon={webtoon}
        prevUrl={prevUrl}
        lang={lang}
        setLang={setLang}
      />
      <main className="max-w-[768px] mx-auto pt-20 pb-40 md:max-w-[630px]">
        {lang === false ? (
          <EngEpisode episode={episode} />
        ) : (
          <KorEpisode episode={episode} />
        )}
        <Buttons
          webtoon={webtoon}
          episode={episode}
          allEpisodes={allEpisodes}
        />
      </main>
    </div>
  );
}
