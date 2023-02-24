import { useEffect, useState } from "react";

export default function getLoggedIn(web3auth) {
  const [loggedIn, setLoggedIn] = useState(web3auth?.provider ? true : false);
  function handleChange() {
    setLoggedIn(web3auth?.provider ? true : false);
  }
  useEffect(() => {
    // window.addEventListener("mousemove", handleChange);
    window.addEventListener("mousemove", handleChange)
    window.addEventListener("touchstart", handleChange)
    handleChange();
    return () => window.removeEventListener("mousemove", handleChange);
  });
  return loggedIn;
}
