import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Tippy from "@tippyjs/react/headless";

export const unloggedInView = (login, web3auth, setProvider) => (
  <button
    onClick={(e) => login(web3auth, setProvider)}
    type="button"
    aria-label="Connect Wallet"
    className="py-3"
  >
    <span className="hidden px-8 py-3 bg-mintGreen border-2 border-mintGreen text-navBg text-base leading-tight font-bold rounded-3xl hover:bg-navBg hover:text-white duration-200 md:inline-block">
      Connect Wallet
    </span>
    <span className="absolute top-6 right-8 p-2 bg-mintGreen border-2 border-mintGreen text-navBg text-base leading-tight rounded-full hover:bg-navBg hover:text-white duration-200 md:hidden">
      <FontAwesomeIcon
        icon={faWallet}
        width="20px"
        height="32px"
      ></FontAwesomeIcon>
    </span>
  </button>
);

// export const loggedInView = (
//   authenticateUser,
//   getAccounts,
//   getBalance,
//   getChainId,
//   getPrivateKey,
//   getUserInfo,
//   logout,
//   sendTransaction,
//   signMessage,
//   web3auth,
//   provider,
//   setProvider
// ) => (
//   <Tippy
//     interactive="true"
//     hideOnClick="false"
//     render={(attrs) => (
//       <div
//         {...attrs}
//         id="tooltip"
//         className="tooltip p-3 flex flex-col gap-2 text-base font-normal"
//       >
//         <div>
//           <button onClick={(e) => getUserInfo(web3auth)}>Get User Info</button>
//         </div>
//         <div>
//           <button onClick={(e) => authenticateUser(web3auth)}>
//             Get ID Token
//           </button>
//         </div>
//         <div>
//           <button onClick={(e) => getChainId(provider)}>Get Chain ID</button>
//         </div>
//         <div>
//           <button onClick={(e) => getAccounts(provider)}>Get Accounts</button>
//         </div>
//         <div>
//           <button onClick={(e) => getBalance(provider)}>Get Balance</button>
//         </div>
//         <div>
//           <button onClick={(e) => signMessage(provider)}>Sign Message</button>
//         </div>
//         <div>
//           <button onClick={(e) => sendTransaction(provider)}>
//             Send Transaction
//           </button>
//         </div>
//         <div>
//           <button onClick={(e) => getPrivateKey(provider)}>
//             Get Private Key
//           </button>
//         </div>
//         <div>
//           <button onClick={(e) => logout(web3auth, setProvider)}>
//             Log Out
//           </button>
//         </div>
//         <div id="arrow" className="arrow" data-popper-arrow=""></div>
//       </div>
//     )}
//   >
//     <button className="rounded-full w-11 h-11 aspect-square bg-white/30 ">
//       <div className="rounded-full w-11 h-11 aspect-square flex items-end justify-center overflow-hidden">
//         <FontAwesomeIcon icon={faUser} className="text-white/50 text-4xl" />
//       </div>
//     </button>
//   </Tippy>
// );
