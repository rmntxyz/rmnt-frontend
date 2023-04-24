import { gql } from "@apollo/client";
import { useRouter } from "next/router";
import client from "../../../../../apollo";
import Seo from "../../../../../comps/layout/SEO";
import Nav from "../../../../../comps/webtoonEpisode/Nav";
import Buttons from "../../../../../comps/webtoonEpisode/Buttons";
import KorEngEpisode from "../../../../../comps/webtoonEpisode/KorEngEpisode";
import { useEffect, useRef, useState } from "react";

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
                released_timestamp
                eng_images(pagination: { limit: 200 }) {
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
                kor_images(pagination: { limit: 200 }) {
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
      episode: episode.attributes,
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
    const handleClick = () => {
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
        !entries[1]?.isIntersecting &&
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

  return (
    <div className="min-h-screen">
      <Seo
        title={`${webtoon.attributes.title} - Ep.${episode.episode_number}`}
      />
      <div
        style={{
          opacity: show ? "1" : "0",
          pointerEvents: show ? "auto" : "none",
        }}
        className="duration-200 w-full"
      >
        <Nav episode={episode} webtoon={webtoon} />
        <Buttons allEpisodes={allEpisodes} showToTop={showToTop} />
      </div>
      <main ref={imageRef} className="max-w-[768px] mx-auto md:max-w-[630px]">
        <div ref={topRef} className="h-20"></div>
        <KorEngEpisode data={language === "kor" ? kor_images : eng_images} />
        <div ref={bottomRef} className="h-40"></div>
      </main>
    </div>
  );
}
