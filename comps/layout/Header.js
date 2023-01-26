import { faArrowLeft, faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";

export default function Header() {
  //Use router to determine whether to show the back button or not
  const router = useRouter();
  return (
    <nav
      className="bg-navBg h-20 px-8 text-2xl font-bold flex justify-between items-center"
      style={{
        display: router.pathname.includes("/episode/") ? "none" : "flex",
      }}
    >
      <div className="flex items-center gap-6">
        <FontAwesomeIcon
          icon={faArrowLeft}
          onClick={() => router.back()}
          style={{ display: router.pathname === "/" ? "none" : "block" }}
          className="cursor-pointer"
        />
        <a href="/">
          <svg
            width="150"
            height="76"
            viewBox="0 0 150 76"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M34.984 40.0998V47.7998H31.428V28.7318H39.604C40.332 28.7318 41.0133 28.8718 41.648 29.1518C42.2827 29.4131 42.824 29.7771 43.272 30.2438C43.7387 30.7105 44.1027 31.2611 44.364 31.8958C44.644 32.5305 44.784 33.2025 44.784 33.9118V34.7518C44.784 35.4611 44.644 36.1331 44.364 36.7678C44.1027 37.3838 43.7387 37.9345 43.272 38.4198C42.824 38.8865 42.2827 39.2505 41.648 39.5118C41.0133 39.7731 40.332 39.9038 39.604 39.9038H38.652L45.12 47.7998H41.06L34.984 40.0998ZM34.984 32.0638V36.5718H39.044C39.8467 36.5718 40.4347 36.3758 40.808 35.9838C41.1813 35.5918 41.368 35.0411 41.368 34.3318C41.368 33.6598 41.1813 33.1185 40.808 32.7078C40.4347 32.2785 39.8467 32.0638 39.044 32.0638H34.984ZM46.6994 38.0558C46.7554 37.4585 46.886 36.8891 47.0914 36.3478C47.3154 35.8065 47.6327 35.3305 48.0434 34.9198C48.454 34.5091 48.9674 34.1825 49.5834 33.9398C50.1994 33.6785 50.9087 33.5478 51.7114 33.5478H53.3914C54.2314 33.5478 54.9594 33.6878 55.5754 33.9678C56.21 34.2478 56.7327 34.6211 57.1434 35.0878C57.554 35.5358 57.862 36.0585 58.0674 36.6558C58.2727 37.2345 58.3754 37.8225 58.3754 38.4198V47.7998H50.4234C49.8074 47.7998 49.2567 47.6878 48.7714 47.4638C48.286 47.2211 47.8754 46.9131 47.5394 46.5398C47.222 46.1478 46.9794 45.6905 46.8114 45.1678C46.662 44.6451 46.5874 44.0851 46.5874 43.4878C46.5874 42.9091 46.6714 42.3678 46.8394 41.8638C47.0074 41.3598 47.25 40.9305 47.5674 40.5758C47.8847 40.2025 48.2767 39.9131 48.7434 39.7078C49.2287 39.4838 49.77 39.3718 50.3674 39.3718H55.1554V39.0918C55.1554 38.7558 55.1274 38.4478 55.0714 38.1678C55.0154 37.8691 54.9127 37.6171 54.7634 37.4118C54.614 37.2065 54.39 37.0478 54.0914 36.9358C53.7927 36.8051 53.3914 36.7398 52.8874 36.7398H52.1874C51.4407 36.7398 50.9087 36.8518 50.5914 37.0758C50.274 37.2811 50.0594 37.6078 49.9474 38.0558H46.6994ZM49.5834 43.4878C49.5834 43.9731 49.6767 44.3371 49.8634 44.5798C50.0687 44.8038 50.2927 44.9158 50.5354 44.9158H55.1554V42.0598H50.5354C50.2927 42.0598 50.0687 42.1811 49.8634 42.4238C49.6767 42.6665 49.5834 43.0211 49.5834 43.4878ZM64.1259 36.4598C64.3872 36.0305 64.7325 35.6571 65.1619 35.3398C65.6099 35.0038 66.0952 34.7238 66.6179 34.4998C67.1592 34.2758 67.7285 34.1078 68.3259 33.9958C68.9232 33.8838 69.5205 33.8278 70.1179 33.8278H70.4819V37.2998H70.1179C69.4459 37.2998 68.7552 37.4398 68.0459 37.7198C67.3365 37.9811 66.6832 38.3358 66.0859 38.7838C65.5072 39.2131 65.0312 39.6985 64.6579 40.2398C64.3032 40.7811 64.1259 41.3225 64.1259 41.8638V47.7998H60.6539V33.4358H64.1259V36.4598ZM72.2398 38.6158C72.2398 37.9251 72.3704 37.2811 72.6318 36.6838C72.8931 36.0678 73.2384 35.5265 73.6678 35.0598C74.0971 34.5931 74.5918 34.2291 75.1518 33.9678C75.7118 33.6878 76.2718 33.5478 76.8318 33.5478H80.0238C80.7518 33.5478 81.3958 33.7065 81.9558 34.0238C82.5344 34.3225 83.0104 34.7145 83.3838 35.1998C83.7758 35.6665 84.0744 36.1985 84.2798 36.7958C84.5038 37.3745 84.6158 37.9438 84.6158 38.5038V42.1158H75.5438V42.8718C75.5438 43.5438 75.7304 44.0198 76.1038 44.2998C76.4771 44.5798 76.9718 44.7198 77.5878 44.7198H84.1118V47.8558H76.8598C76.2251 47.8558 75.6278 47.7345 75.0678 47.4918C74.5078 47.2305 74.0131 46.8851 73.5838 46.4558C73.1731 46.0265 72.8464 45.5131 72.6038 44.9158C72.3611 44.3185 72.2398 43.6651 72.2398 42.9558V38.6158ZM75.5718 39.4558H81.3678V39.3158C81.3678 38.5878 81.1811 37.9905 80.8078 37.5238C80.4344 37.0385 79.9304 36.7958 79.2958 36.7958H77.5598C77.2611 36.7958 76.9904 36.8705 76.7478 37.0198C76.5051 37.1505 76.2998 37.3278 76.1318 37.5518C75.9638 37.7758 75.8238 38.0465 75.7118 38.3638C75.6184 38.6625 75.5718 38.9798 75.5718 39.3158V39.4558ZM101.048 36.7398C100.562 36.7398 100.17 36.8051 99.8718 36.9358C99.5731 37.0478 99.3398 37.2065 99.1718 37.4118C99.0225 37.6171 98.9198 37.8598 98.8638 38.1398C98.8078 38.4198 98.7798 38.7278 98.7798 39.0638V47.7998H95.5038V39.0918C95.5038 38.7558 95.4758 38.4478 95.4198 38.1678C95.3638 37.8691 95.2518 37.6171 95.0838 37.4118C94.9345 37.2065 94.7105 37.0478 94.4118 36.9358C94.1131 36.8051 93.7118 36.7398 93.2078 36.7398H92.5358C92.0505 36.7398 91.6491 36.8051 91.3318 36.9358C91.0331 37.0478 90.7998 37.2065 90.6318 37.4118C90.4638 37.6171 90.3425 37.8691 90.2678 38.1678C90.2118 38.4478 90.1838 38.7558 90.1838 39.0918V47.7998H86.9078V33.5478H90.1838V33.9678C90.9118 33.6878 91.6865 33.5478 92.5078 33.5478H93.7398C94.4865 33.5478 95.1491 33.6598 95.7278 33.8838C96.3065 34.1078 96.8011 34.4158 97.2118 34.8078C97.6598 34.4158 98.1825 34.1078 98.7798 33.8838C99.3771 33.6598 100.049 33.5478 100.796 33.5478H102.252C103.073 33.5478 103.801 33.6878 104.436 33.9678C105.07 34.2478 105.593 34.6211 106.004 35.0878C106.433 35.5358 106.75 36.0585 106.956 36.6558C107.18 37.2345 107.292 37.8225 107.292 38.4198V47.7998H104.044V39.0918C104.044 38.7558 104.016 38.4478 103.96 38.1678C103.904 37.8691 103.792 37.6171 103.624 37.4118C103.456 37.2065 103.222 37.0478 102.924 36.9358C102.625 36.8051 102.233 36.7398 101.748 36.7398H101.048ZM109.291 38.6158C109.291 37.9251 109.421 37.2811 109.683 36.6838C109.944 36.0678 110.289 35.5265 110.719 35.0598C111.148 34.5931 111.643 34.2291 112.203 33.9678C112.763 33.6878 113.323 33.5478 113.883 33.5478H117.075C117.803 33.5478 118.447 33.7065 119.007 34.0238C119.585 34.3225 120.061 34.7145 120.435 35.1998C120.827 35.6665 121.125 36.1985 121.331 36.7958C121.555 37.3745 121.667 37.9438 121.667 38.5038V42.1158H112.595V42.8718C112.595 43.5438 112.781 44.0198 113.155 44.2998C113.528 44.5798 114.023 44.7198 114.639 44.7198H121.163V47.8558H113.911C113.276 47.8558 112.679 47.7345 112.119 47.4918C111.559 47.2305 111.064 46.8851 110.635 46.4558C110.224 46.0265 109.897 45.5131 109.655 44.9158C109.412 44.3185 109.291 43.6651 109.291 42.9558V38.6158ZM112.623 39.4558H118.419V39.3158C118.419 38.5878 118.232 37.9905 117.859 37.5238C117.485 37.0385 116.981 36.7958 116.347 36.7958H114.611C114.312 36.7958 114.041 36.8705 113.799 37.0198C113.556 37.1505 113.351 37.3278 113.183 37.5518C113.015 37.7758 112.875 38.0465 112.763 38.3638C112.669 38.6625 112.623 38.9798 112.623 39.3158V39.4558ZM129.587 36.7398C129.101 36.7398 128.7 36.8051 128.383 36.9358C128.084 37.0478 127.851 37.2065 127.683 37.4118C127.515 37.6171 127.393 37.8691 127.319 38.1678C127.263 38.4478 127.235 38.7558 127.235 39.0918V47.7998H123.959V33.5478H127.235V33.9118C127.888 33.6691 128.588 33.5478 129.335 33.5478H130.791C131.612 33.5478 132.34 33.6878 132.975 33.9678C133.609 34.2478 134.132 34.6211 134.543 35.0878C134.972 35.5358 135.289 36.0585 135.495 36.6558C135.719 37.2345 135.831 37.8225 135.831 38.4198V47.7998H132.555V39.0918C132.555 38.7558 132.527 38.4478 132.471 38.1678C132.415 37.8691 132.303 37.6171 132.135 37.4118C131.985 37.2065 131.761 37.0478 131.463 36.9358C131.164 36.8051 130.763 36.7398 130.259 36.7398H129.587ZM137.227 33.5478H139.859V28.7318H143.163V33.5478H145.795V36.7678H143.163V47.7998H139.859V36.7678H137.227V33.5478Z"
              fill="white"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M24.5 40.4771L16.4917 38.3313V27.5H24.5V40.4771ZM24.5 41.8359L12.1719 38.5326L12.1719 48.5H24.5V41.8359ZM10.8594 48.5L10.8594 43.5776L3.5 43.5776V48.5H10.8594ZM3.5 42.2651L10.8594 42.2651V38.1809L3.5 36.209V42.2651ZM3.5 34.8502L15.1792 37.9796V27.5H3.5V34.8502Z"
              fill="white"
            />
          </svg>
        </a>
      </div>
      {/* <div className="invisible mt-3 cursor-pointer lg:visible ">
        <a href="/">
          <Image
            src="/logo_white/logo_1440.png"
            width={150}
            height={76}
            alt="Rarement Logo"
          />
        </a>
      </div>
      <div className="invisible absolute mt-3 cursor-pointer md:visible lg:invisible ">
        <a href="/">
          <Image
            src="/logo_white/logo_1440.png"
            width={150}
            height={76}
            alt="Rarement Logo"
          />
        </a>
      </div>
      <div className="absolute cursor-pointer mt-3 md:invisible">
        <a href="/">
          <Image
            src="/logo_white/logo_1440.png"
            width={150}
            height={76}
            alt="Rarement Logo"
          />
        </a>
      </div> */}
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
