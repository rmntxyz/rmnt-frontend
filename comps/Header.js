import Link from "next/link";
//import Image from "next/image";

export default function Header() {
  return (
    <nav className="h-20 px-8  bg-neutral-900 text-neutral-100 flex justify-between items-center">
      <div className="m-2.5 cursor-pointer">
        <Link href="/">
          <h1>Rarement</h1>
        </Link>
      </div>
      <button className="inline-block px-6 py-2 border-2 border-neutral-100 text-gray-100 font-medium text-xs leading-tight uppercase rounded hover:bg-neutral-100 hover:text-neutral-900 hover:border-gray-900 transition duration-150 ease-in-out">
        Connect Wallet
      </button>
    </nav>
  );
}
