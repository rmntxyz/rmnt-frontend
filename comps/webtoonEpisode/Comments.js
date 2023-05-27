import { useForm } from "react-hook-form";
import Comment from "./Comment";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import useUser from "../../utils/useUser";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faPhotoFilm } from "@fortawesome/free-solid-svg-icons";
import { isImage } from "../../utils/mediaType";

export default function Comments({ comments, episodeId }) {
  //Get logged in user's ID (temporary)
  const loggedInUser = useUser();
  const loggedInUserId = loggedInUser ? loggedInUser.id : null;

  //Set state for comments for immediate display on screen
  const [allComments, setAllComments] = useState(comments);
  const [commentCount, setCommentCount] = useState(comments.length);
  const [pictureUrl, setPictureUrl] = useState(null);
  const [picture, setPicture] = useState(null);
  const [loading, setLoading] = useState(false);

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
      setPicture(e.target.files[0]);
    }
  };

  const { register, handleSubmit, setValue } = useForm();

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
    const { content } = data;
    if (commentLoading || !loggedInUser) {
      return;
    }

    if (error) {
      alert("Cannot post your comment. Please try again later.");
      console.log(error);
      return;
    }

    if (!content && !picture) {
      return;
    }
    if (picture) {
      if (
        !isImage.includes(
          picture.name.split(".")[picture.name.split(".").length - 1]
        )
      ) {
        alert("The image file should be either png, jpg, jpeg, or gif.");
        return;
      }
      setLoading(true);
      const formData = new FormData();
      formData.append("files", picture);
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
        })
        .catch((err) => {
          console.log(err);
          alert("Cannot post your comment. Please try again later.");
        })
        .finally(() => setLoading(false));
    }
    if (!picture && content) {
      setLoading(true);
      createComment({
        variables: {
          content,
          episode: episodeId,
          publishedAt: new Date().toISOString(),
          posted_by: loggedInUserId,
          image: null,
        },
      }).then(() => setLoading(false));
    }

    setValue("content", "");
    setPicture(null);
    setPictureUrl(null);
  };
  const [createComment, { loading: commentLoading, error }] = useMutation(
    CREATE_COMMENT,
    {
      update: createCommentUpdate,
    }
  );

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
            width={50}
            height={10}
            alt="Rarement Comment Upload Image"
          />
        )}
        <label
          htmlFor="file"
          className="flex items-center px-3 hover:cursor-pointer"
        >
          <FontAwesomeIcon
            icon={faPhotoFilm}
            className="text-base mx-1 md:mx-3 md:text-[24px]"
          />
        </label>
        <input
          type="file"
          id="file"
          onChange={onPictureChange}
          className="hidden input"
          multiple={false}
        />
        {loading ? (
          <svg
            className="animate-spin -ml-1 mr-6 h-8 w-8 md:h-9 md:w-9"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          <button
            type="submit"
            className="flex items-center justify-center pr-6 hover:cursor-pointer"
          >
            <FontAwesomeIcon
              icon={faPaperPlane}
              className="text-base md:text-[24px]"
            />
          </button>
        )}
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
