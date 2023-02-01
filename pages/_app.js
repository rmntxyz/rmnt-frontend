import Layout from "../comps/layout/Layout";
import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo";
import getPrevRoute from "../utils/getPrevRoute";

//Enable wallet connection
const { chains, provider } = configureChains(
  [chain.mainnet, chain.goerli, chain.polygon, chain.optimism, chain.arbitrum],
  [
    alchemyProvider({ alchemyId: "Ajppi54_lVhZ8_x1KIH1-xxm4V9a3kRJ" }),
    publicProvider(),
  ]
);
const { connectors } = getDefaultWallets({
  appName: "rmnt-frontend",
  chains,
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          theme={lightTheme({ accentColor: "#0C0C0C" })}
          chains={chains}
        >
          <Layout>
            {/* {loading ? <Loading /> : <Component {...pageProps} />} */}
            <Component {...pageProps} />
          </Layout>
        </RainbowKitProvider>
      </WagmiConfig>
    </ApolloProvider>
  );
}

export default MyApp;
