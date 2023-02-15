import { faTwitter } from "@fortawesome/free-brands-svg-icons";
// import {
//   faChevronDown,
//   faChevronUp,
//   faCopy,
// } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import ShowOrClose from "../../utils/showOrClose";
import { Email, Instagram, SmallOpenSea } from "../../utils/svgs";

export default function Desc({ props }) {
  //Find if the text is truncated & display the "more/close" button if the text is truncated
  const [truncated, setTruncated] = useState(false);

  useEffect(() => {
    const element = document.getElementById("desc");
    if (element.offsetHeight < element.scrollHeight) {
      setTruncated(true);
    }
  });

  //Toggle the "more/close" button
  const [show, setShow] = useState(false);

  //Add blur to top images while loading
  // const [loading, setLoading] = useState(true);
  // const handleLoading = () => {
  //   setLoading(false);
  // };
  return (
    <div className="profile">
      <div className="relative bg-[#CEA671] w-full h-[224px]">
        {props.attributes.background_image?.data ? (
          <Image
            src={props.attributes.background_image.data.attributes.url}
            layout="fill"
            objectFit="cover"
            alt="Profile Background"
            placeholder="blur"
            blurDataURL={props.attributes.background_image.data.attributes.url}
            // style={{
            //   filter: loading ? "blur(20px)" : "none",
            //   transition: loading ? "none" : "filter 0.3s ease-out",
            // }}
          />
        ) : null}
      </div>
      <div className="relative mx-8 md:mx-28 2xl:container 2xl:mx-auto">
        <div className="absolute -top-24 border-8 border-white rounded-full bg-white w-32 h-32 shadow-small md:w-44 md:h-44 md:-top-36">
          <div className="relative w-full h-full rounded-full overflow-hidden">
            <Image
              alt="Rarement Artist Profile Image"
              // onLoadingComplete={handleLoading}
              placeholder="blur"
              src={
                props.attributes.profile_image?.data
                  ? props.attributes.profile_image.data.attributes.url
                  : "/profile/profile_1440_768@2x.png"
              }
              blurDataURL={
                props.attributes.profile_image?.data
                  ? props.attributes.profile_image.data.attributes.url
                  : "/profile/profile_1440_768@2x.png"
              }
              layout="fill"
              objectFit="contain"
              // style={{
              //   filter: loading ? "blur(20px) " : "none",
              //   transition: loading ? "none" : "filter 0.3s ease-out",
              //   borderRadius: "50%",
              // }}
              className="rounded-full"
            />
          </div>
        </div>
        <div className="flex flex-col gap-5 md:gap-8">
          <div className="flex justify-between mt-10">
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-1.5 md:gap-2">
                <span className="font-extrabold text-[21px] md:text-[32px]">
                  @{props.attributes.first_name}
                </span>
                {/* <div className="relative aspect-square w-[18px] md:w-[28px]">
                  <Image
                    src="/icons/icons8-instagram-verification-badge 1.png"
                    alt="badge icon"
                    layout="fill"
                    objectFit="contain"
                  />
                </div> */}
              </div>
              {props.attributes.wallet_address?.length > 0 ? (
                <div
                  //   onClick={handleCopyClick}
                  className="group flex items-center w-44"
                >
                  <button
                    id="to be copied"
                    className="px-3 py-1 bg-[#E8E8E8] text-ourBlack text-sm rounded-full truncate hover:underline md:text-base"
                    aria-label="Copy Wallet Address"
                  >
                    {props.attributes.wallet_address}
                  </button>
                  {/* <button
                    className="opacity-0 transition-opacity px-2 text-[#555555] group-hover:opacity-100"
                    aria-label="Copy Icon"
                  >
                    {isCopied ? "Copied!" : <FontAwesomeIcon icon={faCopy} />}
                  </button> */}
                </div>
              ) : null}
            </div>
          </div>
          {props.attributes.description?.length > 0 ? (
            <div className="text-justify">
              <div id="desc" className={`${show ? "" : "truncate-2"}`}>
                <ReactMarkdown children={props.attributes.description} />
              </div>
              <ShowOrClose
                truncated={truncated}
                show={show}
                setShow={setShow}
              />
            </div>
          ) : null}

          <div className="flex mb-14 gap-5 md:gap-7 md:mb-20">
            {props.attributes.instagram?.length > 0 ? (
              <a
                href={`https://www.instagram.com/${props.instagram}`}
                target="_blank"
              >
                <Instagram />
              </a>
            ) : null}
            {props.attributes.twitter?.length > 0 ? (
              <a
                href={`https://www.twitter.com/${props.attributes.twitter}`}
                target="_blank"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            ) : null}
            {props.attributes.email?.length > 0 ? (
              <a href={`mailto:${props.attributes.email}`} target="_blank">
                <Email />
              </a>
            ) : null}
            {props.attributes.opensea?.length > 0 ? (
              <a
                href={`https://www.opensea.com/${props.attributes.opensea}`}
                target="_blank"
              >
                <SmallOpenSea />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
