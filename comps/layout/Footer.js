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
      <FontAwesomeIcon icon={icon} size="2x" />
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
    <footer className="h-40 px-10 bg-darkGray flex items-center justify-center md:px-20">
      <div className="container text-lightGray text-[13px] flex flex-col items-center justify-center md:flex-row md:justify-between">
        <ul className="flex items-center">
          <a
            onMouseOver={(e) => setIsHovered(true)}
            onMouseOut={(e) => setIsHovered(false)}
            href="/"
            className="m-3 pt-1"
          >
            <Image
              src={`${
                !isHovered
                  ? "/instagram/instagram_1440_768@2x.png"
                  : "/instagram/instagram_1440_768_hover@2x.png"
              }`}
              width={43}
              height={43}
              // priority={true}
              layout="fixed"
              alt="Instagram"
            />
          </a>
          {OutLinks.map((link, idx) => (
            <li
              key={idx}
              className="m-3 cursor-pointer duration-200 hover:text-[#F3F3F3] md:m-4"
            >
              {link}
            </li>
          ))}
        </ul>
        <ul className="flex items-center">
          {InLinks.map((link, idx) => (
            <li
              key={idx}
              className="m-3 cursor-pointer text-center duration-200 hover:text-[#F3F3F3] md:m-4"
            >
              {link}
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
