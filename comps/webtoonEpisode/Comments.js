import { useForm } from "react-hook-form";
import Comment from "./Comment";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import useUser from "../../utils/useUser";
import Image from "next/image";

export default function Comments({ comments, episodeId }) {
  //Get logged in user's ID (temporary)
  const loggedInUser = useUser();
  const loggedInUserId = loggedInUser ? loggedInUser.id : null;

  //Set state for comments for immediate display on screen
  const [allComments, setAllComments] = useState(comments);
  const [commentCount, setCommentCount] = useState(comments.length);
  const [pictureUrl, setPictureUrl] = useState(null);

  //Create new comment with image upload
  const CREATE_COMMENT = gql`
    mutation CreateComment(
      $content: String
      $episode: ID
      $publishedAt: DateTime
      $posted_by: ID
      $image: ID
    ) {
      createComment(
        data: {
          content: $content
          episode: $episode
          publishedAt: $publishedAt
          posted_by: $posted_by
          image: $image
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
                  liked_by {
                    data {
                      id
                    }
                  }
                }
              }
            }
            image {
              data {
                id
                attributes {
                  url
                }
              }
            }
          }
        }
      }
    }
  `;

  const UPLOAD = gql`
    mutation Upload($files: Upload!) {
      upload(files: $files) {
        id
        attributes {
          url
        }
      }
    }
  `;

  //Provide image preview on file selection
  const onPictureChange = (e) => {
    if (e.target.files.length > 0) {
      setPictureUrl(URL.createObjectURL(e.target.files[0]));
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

  const onValid = async (data) => {
    const { content, files } = data;
    if (loading || !loggedInUser) {
      return;
    }
    if (error) {
      alert("Cannot post your comment. Please try again later.");
    }

    if (!content && !files) {
      return;
    }
    if (files.length > 0) {
      const formData = new FormData();
      formData.append("files", files[0]);
      await fetch("https://rmnt-staging.herokuapp.com/api/upload", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((res) => {
          createComment({
            variables: {
              content,
              episode: episodeId,
              publishedAt: new Date().toISOString(),
              posted_by: loggedInUserId,
              image: res[0].id,
            },
          });
        });
    }
    if (files.length === 0 && content) {
      createComment({
        variables: {
          content,
          episode: episodeId,
          publishedAt: new Date().toISOString(),
          posted_by: loggedInUserId,
          image: null,
        },
      });
    }

    setValue("content", "");
    setValue("files", "");
    setPictureUrl(null);
  };
  const [createComment, { loading, error }] = useMutation(CREATE_COMMENT, {
    update: createCommentUpdate,
  });

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
        style={{ pointerEvents: loggedInUserId ? "all" : "none" }}
        className="z-20 flex items-center my-3 border-2 border-mintGreen rounded-full"
      >
        <input
          {...register("content", { required: false })}
          type="text"
          placeholder={
            loggedInUserId ? "Write a comment..." : "Log in to comment"
          }
          className="input w-full p-3 rounded-full bg-navBg focus:outline-none"
        />
        {pictureUrl && (
          <Image
            src={pictureUrl}
            width={10}
            height={10}
            alt="Rarement Comment Upload Image"
          />
        )}
        <input
          {...register("files", { required: false })}
          type="file"
          onChange={onPictureChange}
        />
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
