import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ShowOrClose({ noMore, show, setShow, next }) {
  return (
    <button
      className="show text-white/50 text-sm flex gap-1 items-center justify-center"
      onClick={(e) => {
        if (noMore) {
          setShow((show) => !show);
        } else {
          setShow(true);
          next(10);
        }
      }}
    >
      <span>{show && noMore ? "close" : "more"}</span>
      <FontAwesomeIcon
        icon={show && noMore ? faChevronUp : faChevronDown}
        size="xs"
      />
    </button>
  );
}
