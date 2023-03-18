import { useEffect, useState } from "react";

export default function getLoggedIn(web3auth) {
  const [loggedIn, setLoggedIn] = useState(web3auth?.provider ? true : false);

  function handleChange(web3auth) {
    setLoggedIn(web3auth?.provider ? true : false);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      handleChange(web3auth);
    }, 1000);
    return () => clearInterval(timer);
  });
  return loggedIn;
}
