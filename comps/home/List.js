import ListItem from "./ListItem";

export default function List({ webtoons, rarementABI }) {
  const firstItem = webtoons[0];
  const restItems = webtoons.slice(1);

  return (
    firstItem && (
      <div>
        <div className="grid grid-cols-1 gap-3">
          <ListItem
            key={firstItem.id}
            item={firstItem}
            idx={0}
            rarementABI={rarementABI}
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {restItems.map((item, idx) => (
              <ListItem
                key={item.id}
                item={item}
                idx={idx + 1}
                rarementABI={rarementABI}
              />
            ))}
            {restItems.length % 2 === 1 && (
              <div className="bg-opaqueGray rounded-2xl hidden sm:flex items-center justify-center aspect-square text-white/100 text-3xl font-bold">
                Coming soon
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
}
