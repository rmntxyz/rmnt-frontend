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

// Configure chains & providers with the Alchemy provider
const networks = [];

if (process.env.NEXT_PUBLIC_VERCEL_ENV === "development") {
  networks.push(polygonMumbai);
} else {
  networks.push(polygon);
}

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
