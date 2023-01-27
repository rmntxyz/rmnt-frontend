import { gql } from "@apollo/client";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import client from "../../../apollo";
import Seo from "../../../comps/layout/SEO";
import Viewer from "../../../comps/webtoonEpisode/Viewer";

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
  return {
    props: {
      webtoon: data.webtoonPage.data.attributes.webtoon_id.data.attributes,
      episode: data.webtoonPage.data.attributes,
      allEpisodes:
        data.webtoonPage.data.attributes.webtoon_id.data.attributes.webtoon_pages.data
          .slice()
          .sort((a, b) => a.attributes.page_number - b.attributes.page_number),
    },
  };
}

export default function Episode({ webtoon, episode, allEpisodes }) {
  //User router to enable the back button
  const router = useRouter();
  return (
    <div>
      <Seo title={`${webtoon.title} - Ep.${episode.page_number}`} />
      <nav className="bg-navBg h-20 pl-8 text-2xl font-bold flex justify-between items-center">
        <FontAwesomeIcon
          icon={faArrowLeft}
          onClick={() => router.back()}
          className="cursor-pointer"
        />
        <div className="flex gap-6">
          <span className="text-lg py-1 px-3.5 rounded-3xl bg-mainBg drop-shadow-[4px_5px_10px_rgba(0, 0, 0, 0.1)]">
            Ep.{episode.page_number}
          </span>
          <span>{webtoon.title}</span>
        </div>
        <Link href="/" passHref>
          <svg
            width="61"
            height="76"
            viewBox="0 0 61 76"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M24.5 40.4771L16.4917 38.3313V27.5H24.5V40.4771ZM24.5 41.8359L12.1719 38.5326L12.1719 48.5H24.5V41.8359ZM10.8594 48.5L10.8594 43.5776L3.5 43.5776V48.5H10.8594ZM3.5 42.2651L10.8594 42.2651V38.1809L3.5 36.209V42.2651ZM3.5 34.8502L15.1792 37.9796V27.5H3.5V34.8502Z"
              fill="white"
            />
          </svg>
        </Link>
      </nav>
      <main className="max-w-[768px] mx-auto">
        <Viewer webtoon={webtoon} episode={episode} allEpisodes={allEpisodes} />
      </main>
    </div>
  );
}
