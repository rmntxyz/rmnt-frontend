import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    //White header (current)
    <nav className="h-20 px-8 text-2xl font-bold bg-white text-ourBlack flex justify-between items-center drop-shadow-rmnt">
      <div className="invisible mt-3 cursor-pointer lg:visible ">
        <Link href="/">
          <Image src="/logo_black/logo_1440.png" width={165} height={80} />
        </Link>
      </div>
      <div className="invisible absolute mt-3 cursor-pointer sm:visible lg:invisible ">
        <Link href="/">
          <Image src="/logo_black/logo_768.png" width={165} height={80} />
        </Link>
      </div>
      <div className="absolute cursor-pointer mt-3 sm:invisible">
        <Link href="/">
          <Image src="/logo_black/logo_360.png" width={165} height={80} />
        </Link>
      </div>
      <button className="invisible sm:visible inline-block px-6 py-2 border-2 border-ourBlack text-ourBlack text-base leading-tight rounded-3xl hover:bg-ourBlack hover:text-white transition duration-150 ease-in-out">
        Connect Wallet
      </button>
      <button className="absolute right-8 inline-block p-2 border-2 border-ourBlack text-ourBlack text-base leading-tight rounded-full hover:bg-ourBlack hover:text-white transition duration-150 ease-in-out sm:invisible">
        <FontAwesomeIcon icon={faWallet} width='20px' height='32px'></FontAwesomeIcon>
      </button>
    </nav>
    //Black header
    // <nav className="h-20 px-8 text-2xl font-bold bg-ourBlack text-white flex justify-between items-center">
    //   <div className="invisible lg:visible cursor-pointer">
    //     <Link href="/">
    //      <Image src="/logo_white/logo_1440.png" width = {165} height = {80}/>
    //     </Link>
    //   </div>
    //   <div className="absolute cursor-pointer lg:invisible">
    //     <Link href="/">
    //       <h1>RMNT</h1>
    //     </Link>
    //   </div>
    //   <button className="invisible md:visible inline-block px-6 py-2 border-2 border-white text-white text-base leading-tight rounded-3xl hover:bg-white hover:text-ourBlack transition duration-150 ease-in-out">
    //     Connect Wallet
    //   </button>
    //   <button className="absolute right-8 inline-block p-2 border-2 border-white text-white text-xs leading-tight rounded-3xl hover:bg-white hover:text-ourBlack transition duration-150 ease-in-out md:invisible">
    //     <FontAwesomeIcon icon={faWallet} size="2x"></FontAwesomeIcon>
    //   </button>
    // </nav>
  );
}
