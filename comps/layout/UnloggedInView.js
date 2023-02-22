import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { magic } from "../../utils/magic";

export default function UnloggedInView(setAccount) {
  const [disabled, setDisabled] = useState(false);

  const connect = async () => {
    try {
      setDisabled(true);
      const accounts = await magic.wallet.connectWithUI();
      setDisabled(false);
      console.log("Logged in user:", accounts[0]);
      localStorage.setItem("user", accounts[0]);
      setAccount(accounts[0]);
    } catch (error) {
      setDisabled(false);
      console.error(error);
    }
  };
  return (
    <button
      onClick={connect}
      disabled={disabled}
      type="button"
      aria-label="Connect Wallet"
      className="py-3"
    >
      <span className="invisible px-8 py-3 bg-mintGreen border-2 border-mintGreen text-navBg text-base leading-tight font-bold rounded-3xl hover:bg-navBg hover:text-white duration-200 md:visible ">
        Connect
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
