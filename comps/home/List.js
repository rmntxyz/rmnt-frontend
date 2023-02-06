import ListItem from "./ListItem";
import SmallItem from "./SmallItem";

export default function List({ data }) {
  //Paginate webtoon cards
  // const [currentPage, setCurrentPage] = useState(1);
  // const [itemsPerPage, setItemsPerPage] = useState(8);
  // const pages = [];
  // for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
  //   pages.push(i);
  // }

  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexofFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = data.slice(indexofFirstItem, indexOfLastItem);

  // //Enable navigation between pages
  // const handleNextbtn = () => {
  //   setCurrentPage(currentPage + 1);
  // };

  // const handlePrevbtn = () => {
  //   setCurrentPage(currentPage - 1);
  // };

  return (
    <div className="grid grid-cols-1 gap-3">
      <div className="grid grid-cols-1 gap-3">
        {data.slice(0, 1).map((item) => (
          <ListItem key={item.id} item={item} />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {data.slice(1).map((item) => (
          <SmallItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}