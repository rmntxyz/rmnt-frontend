import { gql, useMutation } from "@apollo/client";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useTimeLapsed from "../../utils/useTimeLapsed";
import Reply from "./Reply";
import { useState } from "react";
import ReplyInput from "./ReplyInput";

export default function Comment({ comment, setAllComments, setCommentCount }) {
  const { minutesLapsed, hoursLapsed, daysLapsed } = useTimeLapsed({
    publishedAt: comment.attributes.publishedAt,
  });

  const [show, setShow] = useState(false);
  const [allReplies, setAllReplies] = useState(
    comment.attributes.replies ? comment.attributes.replies.data : []
  );

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

  const onReplyClick = () => {
    setShow((prev) => !prev);
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
            : minutesLapsed < 2880
            ? `Yesterday`
            : minutesLapsed >= 2880
            ? `${daysLapsed.toFixed(0)} days ago`
            : ""}
        </span>
      </div>
      <div className="flex gap-2">
        <p className="text-sm">{comment.attributes.content}</p>
        <button className="text-sm text-mintRed" onClick={onDeleteClick}>
          <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
        </button>
        <button className="text-sm text-gray-500" onClick={onReplyClick}>
          Reply
        </button>
      </div>
      <div
        className={`transition-all duration-1000 gap-2 ml-2 my-4 ${
          show ? "h-auto" : "hidden h-0"
        }`}
      >
        <ReplyInput commentId={comment.id} setAllReplies={setAllReplies} />
      </div>
      {allReplies.length > 0 && (
        <div className="flex flex-col gap-2 ml-4 mt-2">
          {allReplies.map((reply) => (
            <Reply
              key={reply.id}
              reply={reply}
              setAllReplies={setAllReplies}
            ></Reply>
          ))}
        </div>
      )}
    </div>
  );
}
