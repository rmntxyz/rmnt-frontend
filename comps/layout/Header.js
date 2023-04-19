import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import usePrevRoute from "../../utils/usePrevRoute";
import { Beta, Logo } from "../../utils/svgs";
import Link from "next/link";
import Connect from "./Connect";

export default function Header() {
  //Use router to determine whether to show the back button or not & whether to display the header or not
  const router = useRouter();

  //Get current/previous routes to determine whether to show the back button or not
  const { prevPath } = usePrevRoute();

  //Handle the back button differently based on the current url
  function handleBack() {
    if (
      router.pathname.includes("/artists/") ||
      prevPath.includes("/artists/") ||
      prevPath.includes("/episode/")
    ) {
      router.back();
    } else router.push("/");
  }

  return (
    <nav
      className="bg-navBg h-20 px-3 text-2xl font-bold flex gap-1 justify-between items-center sm:px-8"
      style={{
        display: router.pathname.includes("/episode/") ? "none" : "flex",
      }}
    >
      <div className="flex items-center gap-1 sm:gap-6">
        <FontAwesomeIcon
          id="back"
          icon={faArrowLeft}
          style={{
            display: router.pathname === "/" || !prevPath ? "none" : "block",
          }}
          onClick={handleBack}
          className="cursor-pointer"
        />
        <Link
          href="/"
          className="flex items-center gap-1 sm:gap-1.5"
          aria-label="Go to Rarement home"
        >
          <Logo />
          <Beta />
        </Link>
      </div>
      <Connect />
    </nav>
  );
}
