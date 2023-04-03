export default function useDate(timestamp) {
  //Find the type of timestamp
  const dateTime =
    timestamp.toString().length === 10
      ? new Date(timestamp * 1000)
      : new Date(timestamp);
  //Find the month/date/year
  const year = dateTime.getFullYear();
  const month =
    (dateTime.getMonth() + 1).toString().length < 2
      ? "0" + (dateTime.getMonth() + 1)
      : dateTime.getMonth() + 1;
  const date =
    dateTime.getDate().toString().length < 2
      ? "0" + dateTime.getDate()
      : dateTime.getDate();
  // const fullDate = dateTime.toDateString().slice(4);
  const differenceInHours = (dateTime - new Date().getTime()) / (1000 * 3600);
  const differenceInDays =
    (dateTime - new Date().getTime()) / (1000 * 3600 * 24);
  const daysFromNow = differenceInDays.toFixed(0);

  return { year, month, date, daysFromNow };
}
