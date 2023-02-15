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
          webtoon_pages(pagination: { limit: 200 }) {
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
                nfts(pagination: { limit: 200 }) {
                  data {
                    id
                    attributes {
                      nft_id
                      name
                      drop_timestamp
                      sold_timestamp
                      quantity
                      edition
                      price_in_wei
                      # timeRemaining
                      image {
                        data {
                          attributes {
                            url
                          }
                        }
                      }
                      thumbnail {
                        data {
                          attributes {
                            url
                          }
                        }
                      }
                      owned_by {
                        data {
                          id
                          attributes {
                            user_id
                            first_name
                            wallet_address
                            profile_image {
                              data {
                                attributes {
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
  const webtoonPages = webtoon.attributes.webtoon_pages.data;
  const webtoonPage = webtoonPages.find(
    (item) => item.attributes.page_number === parseInt(episodeNumber)
  );
  const prevUrl = context.req.headers.referer;
  return {
    props: {
      prevUrl: prevUrl || null,
      webtoon: webtoon,
      episode: webtoonPage.attributes,
      allEpisodes: webtoonPages
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
