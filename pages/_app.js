import Layout from "../comps/layout/Layout";
import "../styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo";
import { useEffect, useState } from "react";

import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, WALLET_ADAPTERS } from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { TorusWalletConnectorPlugin } from "@web3auth/torus-wallet-connector-plugin";
import { MetamaskAdapter } from "@web3auth/metamask-adapter";

//Store the value of web3auth client ID
const clientId =
  "BKelpOscFHII2dWn_u4CgH6rqH8TMqNsHSqg4z8Wsg2wpKnxqP2YCDbhUyxcC2GpDE1CtdjMVxVq55dSSwSOzTU";

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
            chainId: "0x13881",
            rpcTarget: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_POLYGON_ALCHEMY_API_KEY}`,
            displayName: "Polygon Mumbai Testnet",
            blockExplorer: "https://mumbai.polygonscan.com/",
            ticker: "MATIC",
            tickerName: "Matic",
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

        const metamaskAdapter = new MetamaskAdapter({
          clientId,
          sessionTime: 3600, // 1 hour in seconds
          web3AuthNetwork: "testnet",
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x13881",
            rpcTarget: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_POLYGON_ALCHEMY_API_KEY}`,
          },
        });
        web3auth.configureAdapter(metamaskAdapter);

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
    </ApolloProvider>
  );
}

export default MyApp;
