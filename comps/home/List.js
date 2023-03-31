import useScreenSize from "../../utils/useScreenSize";
import ListItem from "./ListItem";

export default function List({ webtoons, rarementABI }) {
  //Get screen size to determine the layout
  const { screenWidth } = useScreenSize();

  return (
    <div>
      {screenWidth >= 640 ? (
        <div className="grid grid-cols-1 gap-3">
          {webtoons.slice(0, 1).map((item, idx) => (
            <ListItem
              key={item.id}
              item={item}
              idx={idx}
              rarementABI={rarementABI}
            />
          ))}
          {webtoons.slice(1)?.length % 2 === 0 ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {webtoons.slice(1).map((item, idx) => (
                <ListItem
                  key={item.id}
                  item={item}
                  idx={idx + 1}
                  rarementABI={rarementABI}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {webtoons.slice(1).map((item, idx) => (
                <ListItem
                  key={item.id}
                  item={item}
                  idx={idx + 1}
                  rarementABI={rarementABI}
                />
              ))}
              <div className="bg-opaqueGray rounded-2xl flex items-center justify-center aspect-square text-white/100 text-3xl font-bold">
                Coming soon
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {webtoons.map((item, idx) => (
            <ListItem
              key={item.id}
              item={item}
              idx={idx + 1}
              rarementABI={rarementABI}
            />
          ))}
        </div>
      )}
    </div>
  );
}
