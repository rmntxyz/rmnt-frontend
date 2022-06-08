import Head from "next/head";

export default function Seo({title}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content="Own the Rare Moment" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}