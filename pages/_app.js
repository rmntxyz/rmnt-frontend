import Layout from "../comps/layout/Layout";
import "../styles/globals.css";
import "0xpass/styles.css";
import { getDefaultWallets, darkTheme, PassProvider } from "0xpass";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygon } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo";

//Store the value of web3auth client ID
const clientId =
  "BKelpOscFHII2dWn_u4CgH6rqH8TMqNsHSqg4z8Wsg2wpKnxqP2YCDbhUyxcC2GpDE1CtdjMVxVq55dSSwSOzTU";

//Configure chains & providers with the Alchemy provider
const { chains, provider } = configureChains(
  [polygon],
  [
    alchemyProvider({ apiKey: "Ajppi54_lVhZ8_x1KIH1-xxm4V9a3kRJ" }),
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
