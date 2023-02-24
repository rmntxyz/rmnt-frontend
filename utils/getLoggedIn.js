import { useEffect, useState } from "react";

export default function getLoggedIn(web3auth) {
  const [loggedIn, setLoggedIn] = useState(web3auth?.provider ? true : false);
  function handleMousemove() {
    setLoggedIn(web3auth?.provider ? true : false);
  }
  useEffect(() => {
    window.addEventListener("mousemove", handleMousemove);
    handleMousemove();
    return () => window.removeEventListener("mousemove", handleMousemove);
  });
  return loggedIn;
}
