import Layout from "../comps/layout/Layout";
import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig, chain } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo";
import { mainnet, goerli } from "wagmi/chains";
import { ethers } from "ethers";
import { magic, UserContext } from "../utils/magic";
import { useEffect, useState } from "react";

//Store the value of web3auth client ID
const clientId =
  "BKelpOscFHII2dWn_u4CgH6rqH8TMqNsHSqg4z8Wsg2wpKnxqP2YCDbhUyxcC2GpDE1CtdjMVxVq55dSSwSOzTU";

//Configure chains & providers with the Alchemy provider
const { chains, provider } = configureChains(
  [mainnet, goerli],
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
  //Initiate magic
  const [account, setAccount] = useState();
  useEffect(() => {
    setAccount(localStorage.getItem("user"));
    const provider = new ethers.providers.Web3Provider(magic.rpcProvider);
  }, []);

  return (
    <ApolloProvider client={client}>
      <WagmiConfig client={wagmiClient}>
        {/* <RainbowKitProvider
          theme={darkTheme({
            accentColor: "#7b3fe4",
            accentColorForeground: "white",
            borderRadius: "small",
            fontStack: "system",
            overlayBlur: "small",
          })}
          chains={chains}
        > */}
        <Layout account={account} setAccount={setAccount}>
          <Component {...pageProps} />
        </Layout>
        {/* </RainbowKitProvider> */}
      </WagmiConfig>
    </ApolloProvider>
  );
}

export default MyApp;
