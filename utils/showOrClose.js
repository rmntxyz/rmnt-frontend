import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ShowOrClose({ truncated, show, setShow }) {
  return (
    <button
      className="show text-white/50 text-sm"
      onClick={(e) => setShow(!show)}
      style={{ display: truncated ? "block" : "none" }}
    >
      <span>{show ? "close" : "more"}</span>
      <FontAwesomeIcon
        icon={show ? faChevronUp : faChevronDown}
        size="xs"
        className="ml-1"
      />
    </button>
  );
}
