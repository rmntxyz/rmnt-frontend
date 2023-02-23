import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react/headless";
import { ethers } from "ethers";
import { magic } from "../../utils/magic";

export default function LoggedInView(setAccount) {
  const provider = new ethers.providers.Web3Provider(magic.rpcProvider);
  const signer = provider.getSigner();

  async function openWallet() {
    const { walletType } = await magic.wallet.getInfo();
    if (walletType === "magic") {
      await magic.wallet.showUI();
    }
  }

  async function logout() {
    try {
      await magic.wallet.disconnect();
      localStorage.removeItem("user");
      setAccount(null);
    } catch (error) {
      console.error(error);
    }
  }

  async function getAddress() {
    try {
      const address = await signer.getAddress();
      alert(address);
    } catch (error) {
      console.error(error);
    }
  }

  async function getBalance() {
    try {
      const address = await signer.getAddress();
      const balance = ethers.utils.formatEther(
        await provider.getBalance(address)
      );
      alert(balance);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Tippy
      interactive="true"
      hideOnClick="false"
      render={(attrs) => (
        <div
          {...attrs}
          id="tooltip"
          className="tooltip p-3 flex flex-col gap-2 text-base font-normal"
        >
          <div>
            <button onClick={(e) => openWallet()}>Open Wallet</button>
          </div>
          <div>
            <button onClick={(e) => getAddress()}>Get Address</button>
          </div>
          <div>
            <button onClick={(e) => getBalance()}>Get Balance</button>
          </div>
          <div>
            <button onClick={(e) => logout()}>Log Out</button>
          </div>
          <div id="arrow" className="arrow" data-popper-arrow=""></div>
        </div>
      )}
    >
      <button className="rounded-full w-11 h-11 aspect-square bg-white/30 ">
        <div className="rounded-full w-11 h-11 aspect-square flex items-end justify-center overflow-hidden">
          <FontAwesomeIcon icon={faUser} className="text-white/50 text-4xl" />
        </div>
      </button>
    </Tippy>
  );
}
