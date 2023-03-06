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
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, WALLET_ADAPTERS } from "@web3auth/base";
import { useEffect, useState } from "react";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { TorusWalletConnectorPlugin } from "@web3auth/torus-wallet-connector-plugin";

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
  //Initiate web3auth
  const [web3auth, setWeb3auth] = useState();
  const [provider, setProvider] = useState();

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          web3AuthNetwork: "testnet",
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x1",
            rpcTarget: "https://rpc.ankr.com/eth", // This is the public RPC we have added, please pass on your own endpoint while creating an app
          },
          uiConfig: {
            theme: "dark",
            loginMethodsOrder: ["google"],
          },
        });

        const torusPlugin = new TorusWalletConnectorPlugin({
          torusWalletOpts: { buttonPosition: "top-right" },
          walletInitOptions: {
            whiteLabel: {
              theme: { isDark: true, colors: { primary: "#70EFCF" } },
              logoDark: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
              logoLight: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
            },
            useWalletConnect: true,
            enableLogging: true,
          },
        });

        await web3auth.addPlugin(torusPlugin);

        const openloginAdapter = new OpenloginAdapter({
          loginSettings: {
            mfaLevel: "default",
          },
          adapterSettings: {
            whiteLabel: {
              name: "Rarement",
              defaultLanguage: "en",
              dark: true,
              theme: { colors: { primary: "#70EFCF" } },
            },
          },
          loginConfig: {
            google: {
              name: "Google Login",
              verifier: "rarement_google_testnet",
              typeOfLogin: "google",
              clientId:
                "829321399103-ibs2ha4eneq0rr9bcc3s8fj0205oq84h.apps.googleusercontent.com",
            },
          },
        });
        web3auth.configureAdapter(openloginAdapter);
        setWeb3auth(web3auth);
        await web3auth.initModal({
          modalConfig: {
            [WALLET_ADAPTERS.OPENLOGIN]: {
              label: "openlogin",
              loginMethods: {
                google: {
                  name: "google login",
                },
                facebook: {
                  showOnModal: false,
                },
                reddit: {
                  showOnModal: false,
                },
                discord: {
                  showOnModal: false,
                },
                twitch: {
                  showOnModal: false,
                },
                twitter: {
                  showOnModal: false,
                },
                github: {
                  showOnModal: false,
                },
                linkedin: {
                  showOnModal: false,
                },
                apple: {
                  showOnModal: false,
                },
                line: {
                  showOnModal: false,
                },
                wechat: {
                  showOnModal: false,
                },
                weibo: {
                  showOnModal: false,
                },
                kakao: {
                  showOnModal: false,
                },
              },
              showOnModal: true,
            },
          },
        });
        if (web3auth.provider) {
          setProvider(web3auth.provider);
        }
      } catch (error) {
        console.error(error);
      }
    };
    init();
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
        <Layout setProvider={setProvider} web3auth={web3auth}>
          <Component {...pageProps} />
        </Layout>
        {/* </RainbowKitProvider> */}
      </WagmiConfig>
    </ApolloProvider>
  );
}

export default MyApp;
