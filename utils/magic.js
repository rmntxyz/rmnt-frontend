import { Magic } from "magic-sdk";
import { createContext } from "react";

const key = "pk_live_618E49B6F1997051";

const createMagic = (key) => {
  return (
    typeof window != "undefined" &&
    new Magic(key, {
      network: "goerli",
    })
  );
};

const magic = createMagic(key);

export { magic };
