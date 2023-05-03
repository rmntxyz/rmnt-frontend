import { faTwitter, faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Line from "../../utils/Line";
import { useRouter } from "next/router";
import { Instagram } from "../../utils/svgs";

// "next.link" must have only one child. (e.g. <a>)
// so, can't use a <Link> component here.
const OutLinkWithIcon = ({ href, icon, desc }) => {
  return (
    <a href={href} aria-label={desc} target="_blank" rel="noopener noreferrer">
      <FontAwesomeIcon icon={icon} />
    </a>
  );
};

const OutLinks = [
  // { href: "/", icon: faInstagram },
  {
    href: "https://twitter.com/rmntxyz",
    icon: faTwitter,
    desc: "Check out Rarement's Twitter feed",
  },
  {
    href: "https://discord.gg/HecyuhkJCD",
    icon: faDiscord,
    desc: "Join Rarement on Discord",
  },
  {
    href: "mailto:support@rmnt.xyz",
    icon: faEnvelope,
    desc: "Contact Rarement by Email",
  },
].map((info) => <OutLinkWithIcon {...info} />);

const InLinks = [
  { href: "/", text: "FAQ" },
  { href: "/", text: "terms of services" },
  {
    href: "https://azure-dormouse-716.notion.site/Privacy-Policy-143c909a8fe943b6b8d379ca3b3b3f3a",
    text: "privacy policy",
  },
].map(({ href, text }) => (
  <Link href={href} target="_blank" rel="noopener noreferrer">
    {text}
  </Link>
));

export default function Footer() {
  //Use router to determine whether to show the footer or not
  const router = useRouter();

  return (
    <footer
      className="pb-14 bg-navBg flex flex-col items-center justify-center gap-6 text-white/80"
      style={{
        display: router.pathname.includes("/episode/") ? "none" : "flex",
      }}
    >
      <Line />
      <div className="rounded-full border border-mintGreen px-6 py-3 cursor-pointer text-mintGreen mt-8 mb-5">
        <Link
          href="https://forms.gle/Aboi8WTLm3214KNB7"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Apply to be Rarement's artist"
        >
          Apply to be Rarement's Artist
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center gap-6">
        <ul className="flex items-center gap-5">
          <li>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Rarement on Instagram"
              className="w-[44px] h-[44px] flex items-center justify-center duration-200 border border-white/20 rounded-full bg-opaqueGray hover:text-[#F3F3F3]"
            >
              <Instagram />
            </a>
          </li>
          {OutLinks.map((link, idx) => (
            <li
              key={idx}
              className="w-[44px] h-[44px] flex items-center justify-center duration-200 border border-white/20 rounded-full bg-opaqueGray hover:text-[#F3F3F3]"
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
      </div>
    </footer>
  );
}
