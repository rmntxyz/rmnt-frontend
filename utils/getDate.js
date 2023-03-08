export default function getDate(epochTimestamp) {
  //Find the date of sale
  const dateTime = new Date(epochTimestamp * 1000);
  const year = dateTime.getFullYear() % 100;
  const month = dateTime.getMonth() + 1;
  const date = dateTime.getDate();
  // const fullDate = dateTime.toDateString().slice(4);
  const differenceInHours =
    (epochTimestamp * 1000 - new Date().getTime()) / (1000 * 3600);
  const differenceInDays =
    (epochTimestamp * 1000 - new Date().getTime()) / (1000 * 3600 * 24);
  const daysFromNow = differenceInDays.toFixed(0);

  return { year, month, date, daysFromNow };
}
