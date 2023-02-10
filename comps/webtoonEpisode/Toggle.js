export default function Toggle() {
  return (
    <label
      htmlFor="Toggle4"
      className="rounded-full gradientBorder inline-flex items-center p-1.5 cursor-pointer text-base"
    >
      <input id="Toggle4" type="checkbox" className="hidden peer" />
      <span className="rounded-full px-[18px] py-[6.5px] bg-white text-navBg peer-checked:bg-transparent peer-checked:text-white/50">
        Eng
      </span>
      <span className="rounded-full px-[18px] py-[6.5px] bg-transparent text-white/50 peer-checked:bg-white peer-checked:text-navBg">
        Kor
      </span>
    </label>
  );
}
