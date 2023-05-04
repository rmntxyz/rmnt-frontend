import Layout from "../comps/layout/Layout";
import "../styles/globals.css";
import "0xpass/styles.css";
import { darkTheme, PassProvider, createClient } from "0xpass";
import { configureChains, WagmiConfig } from "wagmi";
import { polygon, polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo";
import { ParallaxProvider } from "react-scroll-parallax";
import { DefaultSeo } from "next-seo";

//import { Sen } from 'next/font/google'
//const sen = Sen({
//  subsets: ['latin'],
//  weight: ['400', '700', '800'],
//  display: 'block'
//})

// in JSX
// <main className={sen.className}></main>

// Configure chains & providers with the Alchemy provider
const networks = [ polygon, polygonMumbai ];

const { chains } = configureChains(networks, [
  alchemyProvider({
    apiKey: process.env.NEXT_PUBLIC_POLYGON_ALCHEMY_API_KEY,
  }),
  publicProvider(),
]);

// const { connectors } = getDefaultWallets({
//   appName: "rmnt-frontend",
//   chains,
// });
// const wagmiClient = createClient({
//   autoConnect: true,
// });

const passClient = createClient();
// const chains = getDefaultChains();

function MyApp({ Component, pageProps }) {
  const title = "Rarement";
  const desc = "Own the Rare Moment";
  const canonicalUrl = "https://www.rmnt.xyz";

  return (
    <ApolloProvider client={client}>
      <WagmiConfig client={passClient}>
        <PassProvider
          wagmiClientConfig={{ autoConnect: true }}
          apiKey={process.env.NEXT_PUBLIC_0XPASS_API_KEY}
          enabledConnectors={["google", "metaMask", "facebook"]}
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
            <DefaultSeo
              title={title}
              description={desc}
              canonical={canonicalUrl}
              openGraph={{
                url: canonicalUrl,
                title: title,
                description: desc,
                images: [
                  {
                    url: "https://storage.googleapis.com/rmnt/thumbnail_RMNT_SYMBOL_85224726cb/thumbnail_RMNT_SYMBOL_85224726cb.png",
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
            />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ParallaxProvider>
        </PassProvider>
      </WagmiConfig>
    </ApolloProvider>
  );
}

export default MyApp;
