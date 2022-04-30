import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
//import Image from "next/image";

export default function Header() {
  return (
    <nav className="h-20 px-8 text-2xl font-bold bg-neutral-900 text-white flex justify-between items-center">
      <div className="invisible md:visible m-2.5 cursor-pointer">
        <Link href="/">
          <h1>Rarement</h1>
        </Link>
      </div>
      <div className="absolute m-2.5 cursor-pointer md:invisible">
        <Link href="/">
          <h1>RMNT</h1>
        </Link>
      </div>
      <button className="invisible sm:visible inline-block px-6 py-2 border-2 border-white text-white text-base leading-tight rounded-3xl hover:bg-white hover:text-neutral-900 transition duration-150 ease-in-out">
        Connect Wallet
      </button>
      <button className="absolute right-8 inline-block p-2 border-2 border-white text-white text-xs leading-tight rounded-3xl hover:bg-white hover:text-neutral-900 transition duration-150 ease-in-out sm:invisible">
        <FontAwesomeIcon icon={faWallet} size="2x"></FontAwesomeIcon>
      </button>
    </nav>
  );
}
