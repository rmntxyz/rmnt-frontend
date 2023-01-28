import {
  // faInstagram,
  faTwitter,
  faDiscord,
} from "@fortawesome/free-brands-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

// "next.link" must have only one child. (e.g. <a>)
// so, can't use a <Link> component here.
const OutLinkWithIcon = ({ href, icon }) => {
  return (
    <a href={href}>
      <FontAwesomeIcon icon={icon} />
    </a>
  );
};

const OutLinks = [
  // { href: "/", icon: faInstagram },
  { href: "/", icon: faTwitter },
  { href: "/", icon: faDiscord },
  { href: "/", icon: faEnvelope },
].map((info) => <OutLinkWithIcon {...info} />);

const InLinks = [
  { href: "/", text: "FAQ" },
  { href: "/", text: "terms of services" },
  { href: "/", text: "privacy policy" },
].map(({ href, text }) => <Link href={href}>{text}</Link>);

export default function Footer() {
  //Footer icons turn white on hover
  const [isHovered, setIsHovered] = useState(false);

  return (
    <footer className="py-14 bg-navBg flex flex-col items-center justify-center gap-6 text-lightGray">
      <div className="h-px w-full bg-white/10 mb-14"></div>
      <ul className="flex items-center gap-5">
        <a
          onMouseOver={(e) => setIsHovered(true)}
          onMouseOut={(e) => setIsHovered(false)}
          href="/"
          className="w-[44px] h-[44px] flex items-center justify-center border border-white/20 rounded-md bg-opaqueGray"
        >
          <Image
            src={`${
              !isHovered
                ? "/instagram/instagram_1440_768@2x.png"
                : "/instagram/instagram_1440_768_hover@2x.png"
            }`}
            width={20}
            height={20}
            alt="Instagram"
          />
        </a>
        {OutLinks.map((link, idx) => (
          <li
            key={idx}
            className="w-[44px] h-[44px] flex items-center justify-center duration-200 border border-white/20 rounded-md bg-opaqueGray hover:text-[#F3F3F3]"
          >
            {link}
          </li>
        ))}
      </ul>
      <ul className="flex items-center gap-6 text-sm">
        {InLinks.map((link, idx) => (
          <li
            key={idx}
            className="cursor-pointer text-center duration-200 hover:text-[#F3F3F3]"
          >
            {link}
          </li>
        ))}
      </ul>
    </footer>
  );
}
