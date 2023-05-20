import { useForm } from "react-hook-form";
import Comment from "./Comment";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import useUser from "../../utils/useUser";

export default function Comments({ comments, episodeId }) {
  //Get logged in user's ID (temporary)
  const loggedInUser = useUser();
  const loggedInUserId = loggedInUser ? loggedInUser.id : null;

  //Set state for comments for immediate display on screen
  const [allComments, setAllComments] = useState(comments);
  const [commentCount, setCommentCount] = useState(comments.length);
  const [image, setImage] = useState(null);

  //Create new comment with image upload
  const CREATE_COMMENT = gql`
    mutation CreateComment(
      $content: String
      $episode: ID
      $publishedAt: DateTime
      $posted_by: ID
    ) {
      createComment(
        data: {
          content: $content
          episode: $episode
          publishedAt: $publishedAt
          posted_by: $posted_by
        }
      ) {
        data {
          id
          attributes {
            content
            publishedAt
            episode {
              data {
                id
              }
            }
            replies {
              data {
                id
                attributes {
                  content
                  publishedAt
                }
              }
            }
            posted_by {
              data {
                id
                attributes {
                  username
                }
              }
            }
            comment_likes {
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
        }
      }
    }
  `;

  const UPLOAD = gql`
    mutation Upload($file: Upload!) {
      upload(file: $file) {
        id
        attributes {
          url
        }
      }
    }
  `;

  const onImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const { register, handleSubmit, setValue, getValues } = useForm();

  const createCommentUpdate = (cache, result) => {
    const {
      data: {
        createComment: { data: newComment },
      },
    } = result;
    if (newComment) {
      setAllComments((prev) => [newComment, ...prev]);
      setCommentCount((prev) => prev + 1);
    }
  };

  const onValid = (data) => {
    const { content } = data;
    if (loading || uploadLoading) {
      return;
    }
    if (error || uploadError) {
      return;
    }
    if (!loggedInUser) {
      return;
    }
    if (!content && !image) {
      return;
    }
    if (image) {
      upload({
        variables: {
          file: image,
        },
        onCompleted: (data) => {
          const {
            upload: { id },
          } = data;
          createComment({
            variables: {
              content,
              episode: episodeId,
              publishedAt: new Date().toISOString(),
              image: id,
              posted_by: loggedInUserId,
            },
          });
        },
      });
    }
    if (!image) {
      createComment({
        variables: {
          content,
          episode: episodeId,
          publishedAt: new Date().toISOString(),
          posted_by: loggedInUserId,
        },
      });
    }

    setValue("content", "");
  };
  const [createComment, { loading, error }] = useMutation(CREATE_COMMENT, {
    update: createCommentUpdate,
  });
  const [upload, { loading: uploadLoading, error: uploadError }] =
    useMutation(UPLOAD);

  return (
    <div
      id="comments"
      className="py-8 mx-8 max-w-[768px] md:mx-auto md:max-w-[630px]"
    >
      <h2 className="mb-4 text-2xl font-bold">
        {commentCount} {commentCount === 1 ? "Comment" : "Comments"}
      </h2>
      <form
        onSubmit={handleSubmit(onValid)}
        className="z-20 flex items-center my-3 border-2 border-mintGreen rounded-full"
      >
        <input
          {...register("content", { required: false })}
          type="text"
          placeholder="Write a comment..."
          className="input w-full p-3 rounded-full bg-navBg focus:outline-none"
        />
        <input onChange={onImageChange} type="file" />
      </form>
      <div className="flex flex-col gap-7 mt-8">
        {allComments.map((comment, idx) => (
          <Comment
            key={idx}
            comment={comment}
            setAllComments={setAllComments}
            setCommentCount={setCommentCount}
            loggedInUserId={loggedInUserId}
          />
        ))}
      </div>
    </div>
  );
}
