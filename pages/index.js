import About from "../comps/home/About";
import List from "../comps/home/List/List";
import TopCard from "../comps/home/TopCard/TopCard";
import Seo from "../comps/SEO";
import { listUrl, topUrl } from "../comps/URLs";

export async function getServerSideProps() {
  const topRes = await fetch(topUrl);
  const topData = await topRes.json();
  const listRes = await fetch(listUrl);
  const listData = await listRes.json();
  return { props: { topData: topData, listData: listData } };
}

export default function Home({ topData, listData }) {
  return (
    <div className="transition-opacity opacity-100 ease-in">
      <Seo title="Rarement" />
      <main>
        <TopCard data={topData} />
        <List data={listData} />
        <About />
      </main>
    </div>
  );
}
