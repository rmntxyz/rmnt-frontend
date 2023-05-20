import { gql } from "@apollo/client";
import { useRouter } from "next/router";
import client from "../../../../../apollo";
// import ordinal from "ordinal";
// import { NextSeo } from "next-seo";
import Seo from "../../../../../comps/layout/SEO";
import Nav from "../../../../../comps/webtoonEpisode/Nav";
import Buttons from "../../../../../comps/webtoonEpisode/Buttons";
import KorEngEpisode from "../../../../../comps/webtoonEpisode/KorEngEpisode";
import { useEffect, useRef, useState } from "react";
import Progress from "../../../../../comps/webtoonEpisode/Progress";
import Comments from "../../../../../comps/webtoonEpisode/Comments";

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
          episodes(
            pagination: { limit: 200 }
            filters: { publishedAt: { notNull: true } }
          ) {
            data {
              id
              attributes {
                episode_number
                released_timestamp
                publishedAt
                thumbnail {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                eng_images(pagination: { limit: 200 }) {
                  data {
                    id
                    attributes {
                      name
                      caption
                      width
                      height
                      url
                    }
                  }
                }
                kor_images(pagination: { limit: 200 }) {
                  data {
                    id
                    attributes {
                      name
                      caption
                      width
                      height
                      url
                    }
                  }
                }
                comments(pagination: { limit: 200 }, sort: "publishedAt:desc") {
                  data {
                    id
                    attributes {
                      content
                      publishedAt
                      episode {
                        data {
                          id
                        }
                      }
                      posted_by {
                        data {
                          id
                          attributes {
                            username
                          }
                        }
                      }
                      comment_likes {
                        data {
                          id
                          attributes {
                            users_permissions_user {
                              data {
                                id
                              }
                            }
                            publishedAt
                          }
                        }
                      }
                      replies(
                        pagination: { limit: 200 }
                        sort: "publishedAt:asc"
                      ) {
                        data {
                          id
                          attributes {
                            content
                            publishedAt
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
  const episodes = webtoon.attributes.episodes.data;
  const episode = episodes.find(
    (item) => item.attributes.episode_number === parseInt(episodeNumber)
  );

  if (!episode) {
    return {
      notFound: true,
      redirect: { destination: "/404", permanent: false },
    };
  }
  // const prevUrl = context.req.headers.referer;
  return {
    props: {
      // prevUrl: prevUrl || null,
      webtoon: webtoon,
      episode: episode,
      eng_images: episode.attributes.eng_images.data
        .slice()
        .sort((a, b) => a.attributes.caption - b.attributes.caption),
      kor_images: episode.attributes.kor_images.data
        .slice()
        .sort((a, b) => a.attributes.caption - b.attributes.caption),
      allEpisodes: episodes
        .slice()
        .sort(
          (a, b) => a.attributes.episode_number - b.attributes.episode_number
        ),
    },
  };
}

export default function Episode({
  webtoon,
  episode,
  eng_images,
  kor_images,
  allEpisodes,
}) {
  //Listen to click/scroll events to hide or paint navbar & buttons
  const [clicked, setClicked] = useState(false);
  const [show, setShow] = useState(false);
  const [showToTop, setShowToTop] = useState(false);
  const imageRef = useRef();
  const topRef = useRef();
  const bottomRef = useRef();

  useEffect(() => {
    const image = imageRef.current;
    const handleClick = (e) => {
      var target = e.target;
      if (
        target.classList.contains("button") ||
        target.classList.contains("input")
      ) {
        return;
      }
      setClicked(!clicked);
    };
    const handleScroll = () => {
      setClicked(false);
    };
    window.addEventListener("scroll", handleScroll);
    image.addEventListener("click", handleClick);

    const observer = new IntersectionObserver((entries) => {
      //Hide scroll to top button when the top and bottom of the image is visible on first load
      if (
        entries[0]?.isIntersecting &&
        (entries[1]?.isIntersecting === true ||
          entries[1]?.isIntersecting === undefined)
      ) {
        setShowToTop(false);
      } else setShowToTop(true);
      //Hide navbar and buttons when the top and bottom of the image is not visible & not clicked
      if (
        !entries[0]?.isIntersecting &&
        (!entries[1]?.isIntersecting ||
          entries[1]?.isIntersecting === undefined) &&
        !clicked
      ) {
        setShow(false);
      } else {
        setShow(true);
      }
    });
    observer.observe(topRef.current);
    observer.observe(bottomRef.current);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      image.removeEventListener("click", handleClick);
    };
  });

  //Set language for the episode
  const {
    query: { language },
  } = useRouter();

  const episodeNumber = episode.attributes.episode_number;
  const webtoonTitle = webtoon.attributes.title;
  const title = `${webtoonTitle} - Ep.${episodeNumber}`;
  // const desc = `Meet the ${ordinal(episodeNumber)} episode of ${webtoonTitle}`;
  // const canonicalUrl = `https://www.rmnt.xyz/webtoons/${webtoon.attributes.webtoon_id}/episode/${episodeNumber}`;
  return (
    <div className="min-h-screen">
      {/* <NextSeo
        title={title}
        description={desc}
        canonical={canonicalUrl}
        openGraph={{
          url: canonicalUrl,
          title: title,
          description: desc,
          images: [
            {
              url: episode.thumbnail.data.attributes.url,
              width: 700,
              height: 700,
              alt: title,
              type: "image/png",
            },
          ],
        }}
        twitter={{
          handle: "@rmntxyz",
          site: "@rmntxyz",
          cardType: "summary_large_image",
        }}
      /> */}
      <Seo title={title} />
      <div className="relative z-30">
        <Progress />
        <div
          style={{
            opacity: show ? "1" : "0",
            pointerEvents: show ? "auto" : "none",
          }}
          className="duration-200 w-full"
        >
          <Nav episode={episode.attributes} webtoon={webtoon} />
        </div>
      </div>
      <main ref={imageRef}>
        <div className="max-w-[768px] mx-auto md:max-w-[630px]">
          <div ref={topRef} className="h-20"></div>
          <KorEngEpisode data={language === "kor" ? kor_images : eng_images} />
          <Comments
            comments={episode.attributes.comments.data}
            episodeId={episode.id}
          />

          <div ref={bottomRef} className="h-40"></div>
        </div>
        <div
          style={{
            opacity: show ? "1" : "0",
            pointerEvents: show ? "auto" : "none",
          }}
          className="duration-200 w-full"
        >
          <Buttons allEpisodes={allEpisodes} showToTop={showToTop} />
        </div>
      </main>
      <div></div>
    </div>
  );
}
