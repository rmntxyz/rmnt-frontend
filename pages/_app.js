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

// Configure chains & providers with the Alchemy provider
const networks = [ polygon ];

if (process.env.VERCEL_ENV === "development") {
  networks.push(polygonMumbai);
}

const { chains } = configureChains(
  networks,
  [
    alchemyProvider({
      apiKey: process.env.NEXT_PUBLIC_POLYGON_ALCHEMY_API_KEY,
    }),
    publicProvider(),
  ]
);

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
          apiKey="3961a6ca-ac0b-4b06-9b15-95c5ccc7f502"
          enabledConnectors={["google", "metamask"]}
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
