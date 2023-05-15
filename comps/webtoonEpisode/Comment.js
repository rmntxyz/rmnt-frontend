import { gql, useMutation } from "@apollo/client";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useTimeLapsed from "../../utils/useTimeLapsed";
import Reply from "./Reply";
import { useEffect, useState } from "react";
import ReplyInput from "./ReplyInput";
import styles from "./Comment.module.css";
import { set } from "react-hook-form";

export default function Comment({ comment, setAllComments, setCommentCount }) {
  const { minutesLapsed, hoursLapsed, daysLapsed } = useTimeLapsed({
    publishedAt: comment.attributes.publishedAt,
  });

  const [repliesShow, setRepliesShow] = useState(false);
  const [allReplies, setAllReplies] = useState(
    comment.attributes.replies ? comment.attributes.replies.data : []
  );
  const [replyCount, setReplyCount] = useState(
    comment.attributes.replies ? comment.attributes.replies.data.length : 0
  );

  useEffect(() => {
    setAllReplies(
      comment.attributes.replies ? comment.attributes.replies.data : []
    );
    setReplyCount(
      comment.attributes.replies ? comment.attributes.replies.data.length : 0
    );
  }, [comment]);

  const DELETE_COMMENT = gql`
    mutation DeleteComment($id: ID!) {
      deleteComment(id: $id) {
        data {
          id
        }
      }
    }
  `;

  const DELETE_REPLY = gql`
    mutation DeleteReply($id: ID!) {
      deleteReply(id: $id) {
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
      cache.evict({ id: `CommentEntity:${deletedComment.id}` });
      if (allReplies.length > 0) {
        allReplies.forEach((reply) => {
          cache.evict({ id: `ReplyEntity:${reply.id}` });
        });
      }
      setAllComments((prev) =>
        prev.filter((comment) => comment.id !== deletedComment.id)
      );
      setCommentCount((prev) => prev - 1);
      setRepliesShow(false);
    }
  };

  const [deleteComment, { loading }] = useMutation(DELETE_COMMENT, {
    update: deleteCommentUpdate,
  });
  const [deleteReply, { loading: loadingReply }] = useMutation(DELETE_REPLY);

  const onDeleteClick = () => {
    if (loading || loadingReply) {
      return;
    }
    if (allReplies.length > 0) {
      allReplies.forEach((reply) => {
        deleteReply({
          variables: {
            id: reply.id,
          },
        });
      });
    }

    deleteComment({
      variables: {
        id: comment.id,
      },
    });
  };

  const onReplyClick = () => {
    setRepliesShow((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-2 items-start">
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
          {minutesLapsed < 1
            ? "Just now"
            : minutesLapsed < 60
            ? `${minutesLapsed.toFixed(0)} min ago`
            : minutesLapsed < 1440
            ? `${hoursLapsed.toFixed(0)}h ago`
            : minutesLapsed > 1440
            ? `${daysLapsed.toFixed(0)}d ago`
            : ""}
        </span>
      </div>
      <div className="flex gap-2">
        <p className="text-sm">{comment.attributes.content}</p>
        <button
          className="button z-50 text-sm text-mintRed"
          onClick={onDeleteClick}
        >
          <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
        </button>
      </div>
      <button
        className={`button z-50 text-xs text-gray-500 border border-gray-500 rounded-full px-2 py-0.5 transition-all duration-300 ${
          repliesShow ? "text-white border-white" : ""
        }`}
        onClick={onReplyClick}
      >
        {replyCount > 1 ? `${replyCount} replies` : `${replyCount} reply`}
      </button>
      <div
        className={`${
          styles.replies
        }  bg-mainBg transition-all duration-1000 overflow-hidden ${
          repliesShow ? "h-auto" : "h-0"
        }`}
      >
        <div
          className={`flex flex-col gap-2 pl-2 py-4 mx-auto max-w-[768px] md:max-w-[630px] `}
        >
          {allReplies.length > 0 && (
            <div className="flex flex-col gap-2">
              {allReplies.map((reply) => (
                <Reply
                  key={reply.id}
                  reply={reply}
                  setAllReplies={setAllReplies}
                  setReplyCount={setReplyCount}
                ></Reply>
              ))}
            </div>
          )}
          <ReplyInput
            commentId={comment.id}
            setAllReplies={setAllReplies}
            setReplyCount={setReplyCount}
            setAllComments={setAllComments}
          />
        </div>
      </div>
    </div>
  );
}
