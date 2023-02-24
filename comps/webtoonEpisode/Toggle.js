import { useEffect } from "react";

export default function Toggle({ lang, setLang }) {
  useEffect(() => {
    const toggle = document.getElementById("toggle");
    let episodeLang;
    function handleClick() {
      setLang(!lang);
      episodeLang = !lang;
      localStorage.setItem("episodeLang", episodeLang.toString());
    }
    toggle.addEventListener("click", handleClick);
    return () => toggle.removeEventListener("click", handleClick);
  });
  return (
    <label
      htmlFor="toggle"
      className="rounded-full gradientBorder inline-flex items-center p-1.5 cursor-pointer text-base"
    >
      <input id="toggle" type="checkbox" className="hidden peer" />
      <span
        id="eng"
        className={`rounded-full px-[18px] py-[6.5px] ${
          lang ? "bg-transparent text-white/50" : "bg-white text-navBg"
        }`}
      >
        Eng
      </span>
      <span
        id="kor"
        className={`rounded-full px-[18px] py-[6.5px] ${
          lang ? "bg-white text-navBg" : "bg-transparent text-white/50"
        }`}
      >
        Kor
      </span>
    </label>
  );
}
