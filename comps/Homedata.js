//to be changed later
const webtoonData = [
  {
    id: 1,
    profile: "/img_420_420.png",
    author: "author",
    profileLink: "/",
    title: "First",
    vol: 1,
    cover: "/img_420_420.png",
    detailLink: "/",
    available: 5,
    targetTime: "2022-07-01T16:00:00Z",
    minted: false,
  },
  {
    id: 2,
    profile: "/img_420_420.png",
    author: "author",
    profileLink: "/",
    title: "Second",
    vol: 1,
    cover: "/img_420_420.png",
    detailLink: "/",
    available: 0,
    targetTime: "2021-07-01T16:00:00Z",
    minted: true,
  },
  {
    id: 3,
    profile: "/img_420_420.png",
    author: "author",
    profileLink: "/",
    title: "Third",
    vol: 1,
    cover: "/img_420_420.png",
    detailLink: "/",
    available: 5,
    targetTime: "2022-07-01T16:00:00Z",
    minted: false,
  },
  {
    id: 4,
    profile: "/img_420_420.png",
    author: "author",
    profileLink: "/",
    title: "Fourth",
    vol: 1,
    cover: "/img_420_420.png",
    detailLink: "/",
    available: 4,
    targetTime: "2021-07-01T16:00:00Z",
    minted: true,
  },
  {
    id: 5,
    profile: "/img_420_420.png",
    author: "author",
    profileLink: "/",
    title: "Fifth",
    vol: 1,
    cover: "/img_420_420.png",
    detailLink: "/",
    available: 5,
    targetTime: "2021-07-01T16:00:00Z",
    minted: true,
  },
  {
    id: 6,
    profile: "/img_420_420.png",
    author: "author",
    profileLink: "/",
    title: "Sixth",
    vol: 1,
    cover: "/img_420_420.png",
    detailLink: "/",
    available: 0,
    targetTime: "2021-07-01T16:00:00Z",
    minted: true,
  },
  {
    id: 7,
    profile: "/img_420_420.png",
    author: "author",
    profileLink: "/",
    title: "Tango",
    vol: 1,
    cover: "/img_420_420.png",
    detailLink: "/",
    available: 0,
    targetTime: "2021-07-01T16:00:00Z",
    minted: true,
  },
  {
    id: 8,
    profile: "/img_420_420.png",
    author: "author",
    profileLink: "/",
    title: "Daddy's Twenty-Forty-Five",
    vol: 1,
    cover: "/img_420_420.png",
    detailLink: "/",
    available: 5,
    targetTime: "2020-07-01T16:00:00Z",
    minted: true,
  },
  {
    id: 9,
    profile: "/img_420_420.png",
    author: "author",
    profileLink: "/",
    title: "Daddy's Twenty-Forty-Five",
    vol: 1,
    cover: "/img_420_420.png",
    detailLink: "/",
    available: 5,
    targetTime: "2021-07-01T16:00:00Z",
    minted: true,
  },
  {
    id: 10,
    profile: "/img_420_420.png",
    author: "author",
    profileLink: "/",
    title: "Daddy's Twenty-Forty-Five",
    vol: 1,
    cover: "/img_420_420.png",
    detailLink: "/",
    available: 5,
    targetTime: "2022-07-01T16:00:00Z",
    minted: false,
  },
  {
    id: 11,
    profile: "/img_420_420.png",
    author: "author",
    profileLink: "/",
    title: "Eleventh",
    vol: 1,
    cover: "/img_420_420.png",
    detailLink: "/",
    available: 5,
    targetTime: "2022-07-01T16:00:00Z",
    minted: false,
  },
  {
    id: 12,
    profile: "/img_420_420.png",
    author: "author",
    profileLink: "/",
    title: "Twelfth",
    vol: 1,
    cover: "/img_420_420.png",
    detailLink: "/",
    available: 5,
    targetTime: "2022-07-01T16:00:00Z",
    minted: false,
  },
];

const topData = {
  id: 5,
  profile: "/img_420_420.png",
  author: "author",
  profileLink: "/",
  title: "Fifth",
  vol: 1,
  cover: "/img_420_420.png",
  detailLink: "/",
  available: 5,
  targetTime: "2022-07-01T16:00:00Z",
  minted: false,
};

// show latest & unminted first and remove topCard item
const listData = webtoonData
  .reverse()
  .sort((a, b) => a.minted - b.minted)
  .filter((item) => item.id !== topData.id);

export { topData, listData };
