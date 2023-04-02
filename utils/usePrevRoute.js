import { global } from "@apollo/client/utilities/globals";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function usePrevRoute() {
  const router = useRouter();
  const [prevPath, setPrevPath] = useState();
  const [currentPath, setCurrentPath] = useState();
  useEffect(() => {
    storePathValues();
  }, [router.asPath]);
  function storePathValues() {
    const storage = global.sessionStorage;
    if (!storage) return;
    //Set the prev path as the value of the current path
    setPrevPath(storage.getItem("currentPath"));
    storage.setItem("prevPath", prevPath);
    // Set the current path value by looking at the browser's location object.
    storage.setItem("currentPath", global.location.pathname);
    setCurrentPath(storage.getItem("currentPath"));
  }
  return { prevPath, currentPath };
}
