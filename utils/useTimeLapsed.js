export default function useTimeLapsed({ publishedAt }) {
  const minutesLapsed =
    (new Date().getTime() - new Date(publishedAt).getTime()) / (1000 * 60);
  const hoursLapsed =
    (new Date().getTime() - new Date(publishedAt).getTime()) / (1000 * 3600);
  const daysLapsed =
    (new Date().getTime() - new Date(publishedAt).getTime()) /
    (1000 * 3600 * 24);
  return { minutesLapsed, hoursLapsed, daysLapsed };
}
