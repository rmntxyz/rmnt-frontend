import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/legacy/image";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import ShowOrClose from "../../utils/showOrClose";
import { Email, Instagram, ProfileCheck, SmallOpenSea } from "../../utils/svgs";
import CopyAddress from "./CopyAddress";

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

  return (
    <div className="mb-14 text-white/80">
      <div className="relative bg-mainBg w-full h-[224px]">
        {props.attributes.background_image?.data ? (
          <Image
            src={props.attributes.background_image.data.attributes.url}
            layout="fill"
            objectFit="cover"
            alt="Profile Background"
            placeholder="blur"
            blurDataURL={props.attributes.background_image.data.attributes.url}
          />
        ) : null}
      </div>
      <div className="relative mx-8 max-w-[630px] md:mx-auto">
        <div className="absolute -top-16 border-2 border-ourBlack rounded-full bg-ourBlack w-[100px] h-[100px] shadow-small">
          <div className="relative w-full h-full rounded-full overflow-hidden">
            <Image
              alt="Rarement Artist Profile Image"
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
              className="rounded-full"
            />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-start justify-between gap-4 mt-10 sm:flex-row sm:items-center">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-extrabold text-2xl text-white">
                  @{props.attributes.first_name}
                </span>
                <ProfileCheck />
              </div>
              {props.attributes.wallet_address?.length > 0 ? (
                <CopyAddress walletAddress={props.attributes.wallet_address} />
              ) : null}
            </div>
            <div className="flex gap-5">
              {props.attributes.instagram?.length > 0 ? (
                <a
                  href={`https://www.instagram.com/${props.instagram}`}
                  target="_blank"
                  className="w-11 h-11 flex items-center justify-center rounded-full bg-mainBg"
                >
                  <Instagram />
                </a>
              ) : null}
              {props.attributes.twitter?.length > 0 ? (
                <a
                  href={`https://www.twitter.com/${props.attributes.twitter}`}
                  target="_blank"
                  className="w-11 h-11 flex items-center justify-center rounded-full bg-mainBg"
                >
                  <FontAwesomeIcon icon={faTwitter} className="text-white/80" />
                </a>
              ) : null}
              {props.attributes.email?.length > 0 ? (
                <a
                  href={`mailto:${props.attributes.email}`}
                  target="_blank"
                  className="w-11 h-11 flex items-center justify-center rounded-full bg-mainBg"
                >
                  <Email />
                </a>
              ) : null}
              {props.attributes.opensea?.length > 0 ? (
                <a
                  href={`https://www.opensea.com/${props.attributes.opensea}`}
                  target="_blank"
                  className="w-11 h-11 flex items-center justify-center rounded-full bg-mainBg"
                >
                  <SmallOpenSea />
                </a>
              ) : null}
            </div>
          </div>
          {props.attributes.description?.length > 0 ? (
            <div className="text-justify flex flex-col items-start gap-3">
              <div id="desc" className={`${show ? "" : "truncate-5"}`}>
                <ReactMarkdown children={props.attributes.description} />
              </div>
              <ShowOrClose
                truncated={truncated}
                show={show}
                setShow={setShow}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
