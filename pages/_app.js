import Layout from "../comps/layout/Layout";
import "../styles/globals.css";
import "0xpass/styles.css";
import { getDefaultWallets, darkTheme, PassProvider } from "0xpass";
import { configureChains, WagmiConfig, createClient } from "wagmi";
import { polygon } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo";

// Configure chains & providers with the Alchemy provider
const { chains, provider } = configureChains(
  [polygon],
  [
    alchemyProvider({
      apiKey: process.env.NEXT_PUBLIC_POLYGON_ALCHEMY_API_KEY,
    }),
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

// const wagmiClient = createClient();
// const chains = getDefaultChains();

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <WagmiConfig client={wagmiClient}>
        <PassProvider
          apiKey="fa73399c-1ccd-4b68-9634-10ea59b6931f"
          theme={darkTheme({
            accentColor: "#70EFCF",
            accentColorForeground: "black",
            borderRadius: "small",
            fontStack: "system",
            overlayBlur: "small",
          })}
          chains={chains}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PassProvider>
      </WagmiConfig>
    </ApolloProvider>
  );
}

export default MyApp;
