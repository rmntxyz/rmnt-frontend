export default function Comment({ comment }) {
  const minutesLapsed =
    (new Date().getTime() -
      new Date(comment.attributes.publishedAt).getTime()) /
    (1000 * 60);
  const hoursLapsed =
    (new Date().getTime() -
      new Date(comment.attributes.publishedAt).getTime()) /
    (1000 * 3600);
  const daysLapsed =
    (new Date().getTime() -
      new Date(comment.attributes.publishedAt).getTime()) /
    (1000 * 3600 * 24);

  return (
    <div className="flex gap-4">
      {/* <div className="flex-shrink-0">
          <img
            className="w-10 h-10 rounded-full"
            src={comment.user.data.attributes.avatar.url}
            alt={comment.user.data.attributes.username}
          />
        </div> */}
      <div className="flex gap-1">
        <div className="flex items-center gap-2">
          {/* <h3 className="text-lg font-bold">
              {comment.user.data.attributes.username}
            </h3> */}
          <p className="text-sm">{comment.attributes.content}</p>
          <span className="text-sm text-gray-500">
            {minutesLapsed < 2
              ? "Just now"
              : 2 < minutesLapsed < 60
              ? `${minutesLapsed.toFixed(0)} minutes ago`
              : 1 < hoursLapsed < 2
              ? "1 hour ago"
              : 2 <= hoursLapsed < 24
              ? `${hoursLapsed.toFixed(0)} hours ago`
              : 24 < hoursLapsed
              ? `${daysLapsed.toFixed(0)} days ago`
              : ""}
          </span>
        </div>
      </div>
    </div>
  );
}
