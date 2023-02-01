import { gql } from "@apollo/client";
import client from "../../../apollo";
import Seo from "../../../comps/layout/SEO";
import Nav from "../../../comps/webtoonEpisode/Nav";
import hideOrPaint from "../../../utils/hideOrPaint";
import CurrentEpisode from "../../../comps/webtoonEpisode/CurrentEpisode";
import Buttons from "../../../comps/webtoonEpisode/Buttons";

const GET_EPISODE_DATA = gql`
  query Webtoon_Page($id: ID) {
    webtoonPage(id: $id) {
      data {
        id
        attributes {
          webtoon_page_id
          page_number
          page_image {
            data {
              attributes {
                width
                height
                url
              }
            }
          }
          webtoon_id {
            data {
              id
              attributes {
                title
                cover_image {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                webtoon_pages(pagination: { limit: 200 }) {
                  data {
                    id
                    attributes {
                      webtoon_page_id
                      page_number
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
  const { episodeId } = context.query;
  const { data } = await client.query({
    query: GET_EPISODE_DATA,
    variables: {
      id: episodeId,
    },
  });
  const prevUrl = context.req.headers.referer;
  return {
    props: {
      prevUrl: prevUrl || null,
      webtoon: data.webtoonPage.data.attributes.webtoon_id.data,
      episode: data.webtoonPage.data.attributes,
      allEpisodes:
        data.webtoonPage.data.attributes.webtoon_id.data.attributes.webtoon_pages.data
          .slice()
          .sort((a, b) => a.attributes.page_number - b.attributes.page_number),
    },
  };
}

export default function Episode({ webtoon, episode, allEpisodes, prevUrl }) {
  //Hide navbar and navgation buttons on scroll
  hideOrPaint();

  return (
    <div>
      <Seo title={`${webtoon.attributes.title} - Ep.${episode.page_number}`} />
      <Nav episode={episode} webtoon={webtoon} prevUrl={prevUrl} />
      <main className="max-w-[768px] mx-auto pt-20 pb-40">
        <CurrentEpisode episode={episode} />
        <Buttons episode={episode} allEpisodes={allEpisodes} />
      </main>
    </div>
  );
}
