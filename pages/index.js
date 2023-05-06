import { gql } from "@apollo/client";
import client from "../apollo";
import AboutBottom from "../comps/home/AboutBottom";
import AboutTop from "../comps/home/AboutTop";
import Artists from "../comps/home/Artists";
import List from "../comps/home/List";
import Circle from "../utils/Circle";
import { Noise } from "noisejs";
import { useEffect, useRef, useState } from "react";

const GET_HOME_DATA = gql`
  query Home_data {
    webtoons(filters: { priority: { notNull: true } }, sort: "priority") {
      data {
        id
        attributes {
          webtoon_id
          artist_id {
            data {
              id
              attributes {
                first_name
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
          title
          volume
          priority
          released_timestamp
          publishedAt
          priority
          cover_image {
            data {
              attributes {
                url
              }
            }
          }
          avatarGIF {
            data {
              attributes {
                url
              }
            }
          }
          rarement {
            data {
              id
              attributes {
                contractAddress
                chainId
                name
                symbol
                baseURI
                fundingRecipient
                royaltyBPS
                presalePrice
                presaleStartTime
                price
                startTime
                endTime
                maxSupply
                cutoffSupply
                maxMintablePerAccount
                flags
              }
            }
          }
        }
      }
    }
    artists(pagination: { page: 1, pageSize: 6 }) {
      data {
        id
        attributes {
          first_name
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
    rarementContract {
      data {
        attributes {
          rarementABI
        }
      }
    }
  }
`;

export async function getServerSideProps() {
  const { data } = await client.query({
    query: GET_HOME_DATA,
    fetchPolicy: "network-only",
  });

  if (!data) {
    return {
      notFound: true,
      redirect: { destination: "/404", permanent: false },
    };
  }

  return {
    props: {
      webtoons: data.webtoons.data,
      artists: data.artists.data.slice().sort((a, b) => a.id - b.id),
      rarementABI: data.rarementContract.data.attributes.rarementABI,
    },
  };
}

const CIRCLES_INIT = [
  {
    speed: 45,
    top: "40%",
    left: "50%",
    width: "80%",
    opacity: ".09",
    blur: 45,
    dx: 0,
    dy: 0,
    sx: Math.floor(Math.random() * 64000),
    sy: Math.floor(Math.random() * 64000),
  },
  {
    speed: 5,
    top: "60%",
    left: "-15%",
    width: "30%",
    opacity: ".06",
    blur: 40,
    dx: 0,
    dy: 0,
    sx: Math.floor(Math.random() * 64000),
    sy: Math.floor(Math.random() * 64000),
  },
  {
    speed: 30,
    top: "95%",
    left: "-5%",
    width: "40%",
    opacity: ".08",
    blur: 45,
    dx: 0,
    dy: 0,
    sx: Math.floor(Math.random() * 64000),
    sy: Math.floor(Math.random() * 64000),
  },
];

const NOISE_SPEED = 0.002;
const NOISE_AMOUNT = 0.5;

export default function Home({ webtoons, artists, rarementABI }) {
  const animationRef = useRef();
  const [circles, setCircles] = useState(CIRCLES_INIT);
  const noise = new Noise();

  useEffect(() => {
    // animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  function animate() {
    setCircles((circles) => {
      return circles.map((circle, index) => {
        const nsx = circle.sx + NOISE_SPEED;
        const nsy = circle.sy + NOISE_SPEED;

        const rx = noise.simplex2(nsx, 0);
        const ry = noise.simplex2(nsy, 0);

        const ndx = circle.dx + rx * NOISE_AMOUNT;
        const ndy = circle.dy + ry * NOISE_AMOUNT;

        const el = document.getElementById(`circle-${index}`);

        if (el) {
          el.style.marginTop = `${ndy}px`;
          el.style.marginLeft = `${ndx}px`;
        }

        return {
          ...circle,
          dx: ndx,
          dy: ndy,
          sx: nsx,
          sy: nsy,
        };
      });
    });

    animationRef.current = requestAnimationFrame(animate);
  }

  return (
    <div className="overflow-x-clip">
      <main className="relative max-w-[768px] mx-auto px-4 md:max-w-[630px]">
        {/* {circles.map((circle, i) => (
          <Circle key={i} speed={circle.speed}>
            <div
              id={`circle-${i}`}
              style={{
                top: circle.top,
                left: circle.left,
                width: circle.width,
                marginTop: circle.mx,
                marginLeft: circle.my,
                opacity: circle.opacity,
                filter: `blur(${circle.blur}px)`,
              }}
              className={`absolute aspect-square rounded-full bg-mintGreen transform-gpu`}
            ></div>
          </Circle>
        ))} */}
        <List webtoons={webtoons} rarementABI={rarementABI} />
        <AboutTop />
        <Artists artists={artists} />
        <AboutBottom />
     </main>
    </div>
  );
}
