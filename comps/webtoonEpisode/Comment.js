import { gql, useMutation } from "@apollo/client";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useTimeLapsed from "../../utils/useTimeLapsed";
import Reply from "./Reply";
import { useEffect, useRef, useState } from "react";
import ReplyInput from "./ReplyInput";
import styles from "./Comment.module.css";
import Image from "next/image";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";

export default function Comment({
  comment,
  setAllComments,
  setCommentCount,
  loggedInUserId,
}) {
  //Store the value of the comment
  const commentId = comment.id;
  //See if the comment is the logged in user's (temporary)
  const isMyComment = comment.attributes.posted_by?.data?.id === loggedInUserId;

  //See if the comment is liked by the logged in user (temporary)
  const [isLikedByMe, setIsLikedByMe] = useState(
    comment.attributes.comment_likes
      ? comment.attributes.comment_likes.data
          .map((like) => like.attributes.liked_by.data.id)
          .includes(loggedInUserId)
      : false
  );

  //Show time lapsed after the comment was published
  const { minutesLapsed, hoursLapsed, daysLapsed } = useTimeLapsed({
    publishedAt: comment.attributes.publishedAt,
  });

  //Show replies to the comment
  const repliesRef = useRef(null);

  const [repliesShow, setRepliesShow] = useState(false);
  const [allReplies, setAllReplies] = useState(
    comment.attributes.replies ? comment.attributes.replies.data : []
  );
  const [replyCount, setReplyCount] = useState(
    comment.attributes.replies ? comment.attributes.replies.data.length : 0
  );

  //Set likes for the comment
  const [allLikes, setAllLikes] = useState(
    comment.attributes.comment_likes
      ? comment.attributes.comment_likes.data
      : []
  );

  const [likeCount, setLikeCount] = useState(
    comment.attributes.comment_likes
      ? comment.attributes.comment_likes.data.length
      : 0
  );

  //Update the states all the time
  useEffect(() => {
    setAllReplies(
      comment.attributes.replies ? comment.attributes.replies.data : []
    );
    setReplyCount(
      comment.attributes.replies ? comment.attributes.replies.data.length : 0
    );

    setIsLikedByMe(
      comment.attributes.comment_likes
        ? comment.attributes.comment_likes.data
            .map((like) => like.attributes.liked_by.data.id)
            .includes(loggedInUserId)
        : false
    );
    setAllLikes(
      comment.attributes.comment_likes
        ? comment.attributes.comment_likes.data
        : []
    );
    setLikeCount(
      comment.attributes.comment_likes
        ? comment.attributes.comment_likes.data.length
        : 0
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
  });

  //Create or delete comment likes
  const CREATE_COMMENT_LIKE = gql`
    mutation CreateCommentLike(
      $comment: ID
      $liked_by: ID
      $publishedAt: DateTime
    ) {
      createCommentLike(
        data: {
          comment: $comment
          liked_by: $liked_by
          publishedAt: $publishedAt
        }
      ) {
        data {
          id
          attributes {
            publishedAt
            comment {
              data {
                id
              }
            }
            liked_by {
              data {
                id
              }
            }
          }
        }
      }
    }
  `;
  const [createCommentLike] = useMutation(CREATE_COMMENT_LIKE, {
    update: (cache, result) => {
      const {
        data: {
          createCommentLike: { data: newCommentLike },
        },
      } = result;
      if (newCommentLike) {
        setLikeCount((prev) => prev + 1);
        setIsLikedByMe(true);
        setAllLikes((prev) => [...prev, newCommentLike]);
        setAllComments((prev) => {
          const newComments = prev.map((comment) => {
            if (comment.id === newCommentLike.attributes.comment.data.id) {
              comment.attributes.comment_likes.data.push(newCommentLike);
            }
            return comment;
          });
          return newComments;
        });
      }
    },
  });

  const DELETE_COMMENT_LIKE = gql`
    mutation DeleteCommentLike($id: ID!) {
      deleteCommentLike(id: $id) {
        data {
          id
          attributes {
            publishedAt
            comment {
              data {
                id
              }
            }
            liked_by {
              data {
                id
              }
            }
          }
        }
      }
    }
  `;
  const [deleteCommentLike] = useMutation(DELETE_COMMENT_LIKE, {
    update: (cache, result) => {
      const {
        data: {
          deleteCommentLike: { data: deletedCommentLike },
        },
      } = result;
      if (deletedCommentLike) {
        cache.evict({ id: `CommentLikeEntity:${deletedCommentLike.id}` });
        setLikeCount((prev) => prev - 1);
        setIsLikedByMe(false);
        setAllLikes((prev) =>
          prev.filter((commentLike) => commentLike.id !== deletedCommentLike.id)
        );
        setAllComments((prev) => {
          const newComments = prev.map((comment) => {
            if (comment.id === commentId) {
              comment.attributes.comment_likes.data =
                comment.attributes.comment_likes.data.filter(
                  (commentLike) => commentLike.id !== deletedCommentLike.id
                );
            }
            return comment;
          });
          return newComments;
        });
      }
    },
  });

  const handleLike = () => {
    if (!loggedInUserId) {
      return;
    }
    if (isLikedByMe) {
      const commentLikeId = comment.attributes.comment_likes.data.find(
        (commentLike) =>
          commentLike.attributes.liked_by.data.id === loggedInUserId
      ).id;
      deleteCommentLike({
        variables: {
          id: commentLikeId,
        },
      });
    } else {
      createCommentLike({
        variables: {
          comment: commentId,
          liked_by: loggedInUserId,
          publishedAt: new Date().toISOString(),
        },
      });
    }
  };

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
      if (allLikes.length > 0) {
        allLikes.forEach((like) => {
          cache.evict({ id: `CommentLikeEntity:${like.id}` });
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

    if (allLikes.length > 0) {
      allLikes.forEach((like) => {
        deleteCommentLike({
          variables: {
            id: like.id,
          },
        });
      });
    }

    deleteComment({
      variables: {
        id: commentId,
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
          alt={
            comment.attributes.posted_by?.data
              ? comment.attributes.posted_by.data.attributes.username
              : "Rarement User Image"
          }
          style={{ width: "auto", height: "auto" }}
        />
        <h3 className="font-bold truncate max-w-[64px]">
          {comment.attributes.posted_by?.data
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
        <button
          className="button z-20 text-mintRed"
          onClick={onDeleteClick}
          style={{ display: isMyComment ? "block" : "none" }}
        >
          <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
        </button>
      </div>
      <div className="flex gap-3 items-center">
        <div
          className="flex gap-1 items-center"
          style={{ pointerEvents: loggedInUserId ? "all" : "none" }}
        >
          <button className="button z-20 text-mintRed" onClick={handleLike}>
            <FontAwesomeIcon
              icon={isLikedByMe ? solidHeart : regularHeart}
            ></FontAwesomeIcon>
          </button>
          <span
            className="text-xs text-mintRed"
            style={{ display: likeCount > 0 ? "block" : "none" }}
          >
            {likeCount}
          </span>
        </div>
        <button
          className={`button replyButton z-20 text-xs text-gray-500 border border-gray-500 rounded-full px-2 py-0.5 transition-all duration-300 ${
            repliesShow ? "text-white border-white" : ""
          }`}
          onClick={onReplyClick}
        >
          {replyCount > 1 ? `${replyCount} replies` : `${replyCount} reply`}
        </button>
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
                  loggedInUserId={loggedInUserId}
                ></Reply>
              ))}
            </div>
          )}
          <ReplyInput
            commentId={commentId}
            setAllReplies={setAllReplies}
            setReplyCount={setReplyCount}
            setAllComments={setAllComments}
            loggedInUserId={loggedInUserId}
          />
        </div>
      </div>
    </div>
  );
}
