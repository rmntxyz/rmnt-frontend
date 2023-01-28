import { gql } from "@apollo/client";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import client from "../../../apollo";
import Seo from "../../../comps/layout/SEO";
import { SmallLogo } from "../../../comps/svgs/svgs";
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
          <a>
            <SmallLogo />
          </a>
        </Link>
      </nav>
      <main className="max-w-[768px] mx-auto">
        <Viewer webtoon={webtoon} episode={episode} allEpisodes={allEpisodes} />
      </main>
    </div>
  );
}
