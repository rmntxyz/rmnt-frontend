import Layout from "../comps/layout/Layout";
import "../styles/globals.css";
import { config, dom } from "@fortawesome/fontawesome-svg-core";

import "0xpass/styles.css"
import { PassProvider, getDefaultWallets, darkTheme } from "0xpass"
import { WagmiConfig, configureChains, createClient } from "wagmi"
import { polygon, polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { ApolloProvider } from "@apollo/client";
import client from "../apollo";

import { ParallaxProvider } from "react-scroll-parallax";

import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";

config.autoAddCss = false;

const networks = [polygon, polygonMumbai];
const { chains, provider } = configureChains(networks, [
  alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_POLYGON_ALCHEMY_API_KEY }),
  publicProvider(),
]);

const { connectors } = getDefaultWallets({
  appName: "rmnt-test",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

function MyApp({ Component, pageProps }) {
  // const title = "Rarement";
  // const desc = "Own the Rare Moment";
  // const canonicalUrl = "https://rmnt.xyz";

  return (
    <ApolloProvider client={client}>
      <WagmiConfig client={wagmiClient}>
        <PassProvider
          apiKey={process.env.NEXT_PUBLIC_0XPASS_API_KEY}
          enabledConnectors={["metaMask", "google", "facebook"]}
          theme={darkTheme({
            accentColor: "#70EFCF",
            accentColorForeground: "black",
            borderRadius: "small",
            fontStack: "system",
            overlayBlur: "small",
          })}
          chains={chains}
        >
          <ParallaxProvider>
            <Head>
              <style>{dom.css()}</style>
            </Head>
            <Layout>
              <Component {...pageProps} />
              <Analytics />
            </Layout>
          </ParallaxProvider>
        </PassProvider>
      </WagmiConfig>
    </ApolloProvider>
  );
}

export default MyApp;
