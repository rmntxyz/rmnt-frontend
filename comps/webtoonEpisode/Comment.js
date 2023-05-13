import { gql, useMutation } from "@apollo/client";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Comment({ comment, setAllComments, setCommentCount }) {
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

  const DELETE_COMMENT = gql`
    mutation DeleteComment($id: ID!) {
      deleteComment(id: $id) {
        data {
          id
        }
      }
    }
  `;

  const deleteCommentUpdate = (cache, result) => {
    const {
      data: {
        deleteComment: { data: deletedComment },
      },
    } = result;
    if (deletedComment) {
      setAllComments((prev) =>
        prev.filter((comment) => comment.id !== deletedComment.id)
      );
      setCommentCount((prev) => prev - 1);
    }
  };

  const [deleteComment, { loading }] = useMutation(DELETE_COMMENT, {
    update: deleteCommentUpdate,
  });

  const onDeleteClick = () => {
    if (loading) {
      return;
    }
    deleteComment({
      variables: {
        id: comment.id,
      },
    });
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-1">
        {/* <div className="flex-shrink-0">
          <img
            className="w-10 h-10 rounded-full"
            src={comment.user.data.attributes.avatar.url}
            alt={comment.user.data.attributes.username}
          />
        </div> */}
        {/* <h3 className="text-lg font-bold">
              {comment.user.data.attributes.username}
            </h3> */}
        <span className="text-sm text-gray-500">
          {minutesLapsed < 2
            ? "Just now"
            : minutesLapsed < 60
            ? `${minutesLapsed.toFixed(0)} minutes ago`
            : minutesLapsed < 120
            ? "1 hour ago"
            : minutesLapsed < 1440
            ? `${hoursLapsed.toFixed(0)} hours ago`
            : minutesLapsed >= 1440
            ? `${daysLapsed.toFixed(0)} days ago`
            : ""}
        </span>
      </div>
      <div className="flex gap-2">
        <p className="text-sm">{comment.attributes.content}</p>
        <button className="text-sm text-mintRed" onClick={onDeleteClick}>
          <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
        </button>
        <button className="text-sm text-gray-500">Reply</button>
      </div>
    </div>
  );
}
