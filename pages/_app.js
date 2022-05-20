import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../comps/layout/Layout";
import Loading from "../comps/layout/Loading";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const handleStart = () => {
      setLoading(true);
    };
    const handleComplete = () => {
      setLoading(false);
    };
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);
  return (
    <Layout>{loading ? <Loading /> : <Component {...pageProps} />}</Layout>
  );
}

export default MyApp;
