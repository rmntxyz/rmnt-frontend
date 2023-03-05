import { gql } from "@apollo/client";
import { useRouter } from "next/router";
import client from "../../../../../apollo";
import Seo from "../../../../../comps/layout/SEO";
import Nav from "../../../../../comps/webtoonEpisode/Nav";
import hideOrPaint from "../../../../../utils/hideOrPaint";
import Buttons from "../../../../../comps/webtoonEpisode/Buttons";
import KorEngEpisode from "../../../../../comps/webtoonEpisode/KorEngEpisode";

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
                eng_images(pagination: { limit: 200 }, sort: "caption") {
                  data {
                    attributes {
                      name
                      caption
                      width
                      height
                      url
                    }
                  }
                }
                kor_images(pagination: { limit: 200 }, sort: "caption") {
                  data {
                    attributes {
                      name
                      caption
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

  //Set language for the episode
  const {
    query: { language },
  } = useRouter();

  return (
    <div className="min-h-screen">
      <Seo
        title={`${webtoon.attributes.title} - Ep.${episode.episode_number}`}
      />
      <Nav episode={episode} webtoon={webtoon} prevUrl={prevUrl} />
      <main className="max-w-[768px] mx-auto pt-20 pb-40 md:max-w-[630px]">
        <KorEngEpisode
          data={
            language === "kor"
              ? episode.kor_images.data
              : episode.eng_images.data
          }
        />
        <Buttons
          webtoon={webtoon}
          episode={episode}
          allEpisodes={allEpisodes}
        />
      </main>
    </div>
  );
}
