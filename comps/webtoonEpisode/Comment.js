import { gql, useMutation } from "@apollo/client";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useTimeLapsed from "../../utils/useTimeLapsed";
import Reply from "./Reply";
import { useEffect, useRef, useState } from "react";
import ReplyInput from "./ReplyInput";
import styles from "./Comment.module.css";
import Image from "next/image";

export default function Comment({ comment, setAllComments, setCommentCount }) {
  //Show time lapsed after comment was published
  const { minutesLapsed, hoursLapsed, daysLapsed } = useTimeLapsed({
    publishedAt: comment.attributes.publishedAt,
  });

  //Show replies to comments
  const repliesRef = useRef(null);

  const [repliesShow, setRepliesShow] = useState(false);
  const [allReplies, setAllReplies] = useState(
    comment.attributes.replies ? comment.attributes.replies.data : []
  );
  const [replyCount, setReplyCount] = useState(
    comment.attributes.replies ? comment.attributes.replies.data.length : 0
  );

  const [likeCount, setLikeCount] = useState(
    comment.attributes.liked_by ? comment.attributes.liked_by.data.length : 0
  );

  useEffect(() => {
    setAllReplies(
      comment.attributes.replies ? comment.attributes.replies.data : []
    );
    setReplyCount(
      comment.attributes.replies ? comment.attributes.replies.data.length : 0
    );
    setLikeCount(
      comment.attributes.liked_by ? comment.attributes.liked_by.data.length : 0
    );

    const handleClickOutside = (e) => {
      var target = e.target;
      if (target.classList.contains("replyButton")) {
        return;
      }
      if (repliesRef.current && !repliesRef.current.contains(e.target)) {
        setRepliesShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [comment]);

  //Delete comment and replies
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
      <div className="flex gap-2 items-center">
        <Image
          className="rounded-full"
          src="/profile/popup_profile.png"
          width={24}
          height={24}
          alt="RMNT user image"
          // alt={comment.user.data.attributes.username}
          style={{ width: "auto", height: "auto" }}
        />
        <h3 className="font-bold truncate max-w-[64px]">
          {comment.attributes.posted_by.data
            ? comment.attributes.posted_by.data.attributes.username
            : "User"}
        </h3>

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
      <div className="flex gap-2 text-sm items-end">
        <p>{comment.attributes.content}</p>
        <button className="button z-20 text-mintRed" onClick={onDeleteClick}>
          <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
        </button>
        <button className="button z-20 text-mintRed">
          <FontAwesomeIcon icon={regularHeart}></FontAwesomeIcon>
        </button>
      </div>
      <div className="flex gap-2 items-center">
        <button
          className={`button replyButton z-20 text-xs text-gray-500 border border-gray-500 rounded-full px-2 py-0.5 transition-all duration-300 ${
            repliesShow ? "text-white border-white" : ""
          }`}
          onClick={onReplyClick}
        >
          {replyCount > 1 ? `${replyCount} replies` : `${replyCount} reply`}
        </button>
        <span className="text-xs text-gray-500">
          {likeCount > 1 ? `${likeCount} likes` : `${likeCount} like`}
        </span>
      </div>
      <div
        ref={repliesRef}
        className={`${
          styles.replies
        }  bg-mainBg transition-all duration-1000 overflow-hidden ${
          repliesShow ? "h-auto" : "h-0"
        }`}
      >
        <div
          className={`flex flex-col gap-2 pl-2 py-4 mx-8 max-w-[768px] md:mx-auto md:max-w-[630px] `}
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
