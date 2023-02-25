export default function Toggle({ lang, setLang }) {
  function handleEngClick() {
    setLang(false);
    localStorage.setItem("episodeLang", "false");
  }
  function handleKorClick() {
    setLang(true);
    localStorage.setItem("episodeLang", "true");
  }

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
        onClick={handleEngClick}
      >
        Eng
      </span>
      <span
        id="kor"
        className={`rounded-full px-[18px] py-[6.5px] ${
          lang ? "bg-white text-navBg" : "bg-transparent text-white/50"
        }`}
        onClick={handleKorClick}
      >
        Kor
      </span>
    </label>
  );
}
