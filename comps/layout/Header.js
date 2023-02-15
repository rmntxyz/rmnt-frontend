import { faArrowLeft, faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";
import { Logo, MediumLogo } from "../../utils/svgs";

export default function Header() {
  //Use router to determine whether to show the back button or not & whether to display the header or not
  const router = useRouter();

  //Get current/previous routes to determine whether to show the back button or not
  // const { prevPath } = getPrevRoute();

  return (
    <nav
      className="bg-navBg h-20 px-8 text-2xl font-bold flex justify-between items-center"
      style={{
        display: router.pathname.includes("/episode/") ? "none" : "flex",
      }}
    >
      <div className="flex items-center gap-6">
        <a
          style={{
            display: router.pathname === "/" ? "none" : "block",
          }}
          href="/"
        >
          <FontAwesomeIcon
            id="back"
            icon={faArrowLeft}
            onClick={() => router.back()}
            className="cursor-pointer"
          />
        </a>
        <a href="/">
          <div className="hidden md:block">
            <Logo />
          </div>
          <div className="block md:hidden">
            <MediumLogo />
          </div>
        </a>
      </div>
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          mounted,
        }) => {
          return (
            <div
              {...(!mounted && {
                "aria-hidden": true,
                style: {
                  opacity: 0,
                  pointerEvents: "none",
                  userSelect: "none",
                },
              })}
            >
              {(() => {
                if (!mounted || !account || !chain) {
                  return (
                    <button
                      onClick={openConnectModal}
                      type="button"
                      aria-label="Connect Wallet"
                      className="py-3"
                    >
                      <span className="invisible px-8 py-3 bg-mintGreen border-2 border-mintGreen text-navBg text-base leading-tight font-bold rounded-3xl hover:bg-navBg hover:text-white duration-200 md:visible ">
                        Connect Wallet
                      </span>
                      <span className="absolute top-6 right-8 p-2 bg-mintGreen border-2 border-mintGreen text-navBg text-base leading-tight rounded-full hover:bg-navBg hover:text-white duration-200 md:invisible">
                        <FontAwesomeIcon
                          icon={faWallet}
                          width="20px"
                          height="32px"
                        ></FontAwesomeIcon>
                      </span>
                    </button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <button onClick={openChainModal} type="button">
                      Wrong network
                    </button>
                  );
                }

                return (
                  <div style={{ display: "flex", gap: 12 }}>
                    <button
                      onClick={openChainModal}
                      style={{ display: "flex", alignItems: "center" }}
                      type="button"
                    >
                      {chain.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                            width: 12,
                            height: 12,
                            borderRadius: 999,
                            overflow: "hidden",
                            marginRight: 4,
                          }}
                        >
                          {chain.iconUrl && (
                            <img
                              alt={chain.name ?? "Chain icon"}
                              src={chain.iconUrl}
                              style={{ width: 12, height: 12 }}
                            />
                          )}
                        </div>
                      )}
                      {chain.name}
                    </button>

                    <button onClick={openAccountModal} type="button">
                      {account.displayName}
                      {account.displayBalance
                        ? ` (${account.displayBalance})`
                        : ""}
                    </button>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </nav>
  );
}
