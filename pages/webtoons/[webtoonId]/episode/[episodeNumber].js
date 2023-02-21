import { gql } from "@apollo/client";
import client from "../../../../apollo";
import Seo from "../../../../comps/layout/SEO";
import Nav from "../../../../comps/webtoonEpisode/Nav";
import hideOrPaint from "../../../../utils/hideOrPaint";
import CurrentEpisode from "../../../../comps/webtoonEpisode/CurrentEpisode";
import Buttons from "../../../../comps/webtoonEpisode/Buttons";

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
                image {
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
  return (
    <div className="min-h-screen">
      <Seo
        title={`${webtoon.attributes.title} - Ep.${episode.episode_number}`}
      />
      <Nav episode={episode} webtoon={webtoon} prevUrl={prevUrl} />
      <main className="max-w-[768px] mx-auto pt-20 pb-40 md:max-w-[630px]">
        <CurrentEpisode episode={episode} />
        <Buttons
          webtoon={webtoon}
          episode={episode}
          allEpisodes={allEpisodes}
        />
      </main>
    </div>
  );
}
