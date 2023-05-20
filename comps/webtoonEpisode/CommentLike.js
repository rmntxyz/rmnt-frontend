import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";

export default function CommentLike({
  setAllComments,
  comment,
  loggedInUserId,
  allLikes,
  setAllLikes,
}) {
  //See if the comment is liked by the logged in user (temporary)
  const [isLikedByMe, setIsLikedByMe] = useState(
    allLikes.length > 0
      ? allLikes
          .map((like) => like.attributes.users_permissions_user.data.id)
          .includes(loggedInUserId)
      : false
  );

  //Set the number of likes for the comment
  const [likeCount, setLikeCount] = useState(
    allLikes.length > 0 ? allLikes.length : 0
  );

  useEffect(() => {
    setLikeCount(allLikes.length > 0 ? allLikes.length : 0);
    setIsLikedByMe(
      allLikes.length > 0
        ? allLikes
            .map((like) => like.attributes.users_permissions_user.data.id)
            .includes(loggedInUserId)
        : false
    );
  });

  //Update comment likes
  const CREATE_COMMENT_LIKE = gql`
    mutation CreateCommentLike(
      $comment: ID
      $users_permissions_user: ID
      $publishedAt: DateTime
    ) {
      createCommentLike(
        data: {
          comment: $comment
          users_permissions_user: $users_permissions_user
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
            users_permissions_user {
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
            users_permissions_user {
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

        // setAllComments((prev) => {
        //   const newComments = prev.map((comment) => {
        //     if (comment.id === deletedCommentLike.attributes.comment.data.id) {
        //       comment.attributes.comment_likes.data =
        //         comment.attributes.comment_likes.data.filter(
        //           (commentLike) => commentLike.id !== deletedCommentLike.id
        //         );
        //     }
        //     return comment;
        //   });
        //   return newComments;
        // });
      }
    },
  });

  const handleLike = () => {
    if (isLikedByMe) {
      const commentLikeId = comment.attributes.comment_likes.data.find(
        (commentLike) =>
          commentLike.attributes.users_permissions_user.data.id ===
          loggedInUserId
      ).id;
      deleteCommentLike({
        variables: {
          id: commentLikeId,
        },
      });
    } else {
      createCommentLike({
        variables: {
          comment: comment.id,
          users_permissions_user: loggedInUserId,
          publishedAt: new Date().toISOString(),
        },
      });
    }
  };

  return (
    <div className="flex gap-1 items-center">
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
  );
}
