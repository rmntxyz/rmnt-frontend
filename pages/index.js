import Head from "next/head";
import About from "../comps/home/About";
import { listData } from "../comps/Homedata";
import { topData } from "../comps/Homedata";
import List from "../comps/home/List/List";
import TopCard from "../comps/home/TopCard/TopCard";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <TopCard data={topData} />
        <List data={listData} />
        <About />
      </main>
    </div>
  );
}
