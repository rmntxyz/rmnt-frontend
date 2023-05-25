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
      # $image: ID

    ) {
      createComment(
        data: {
          content: $content
          episode: $episode
          publishedAt: $publishedAt
          posted_by: $posted_by
          # image: $image
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
          }
        }
      }
    }
  `;

  const UPLOAD = gql`
    mutation Upload(
      $file: Upload!
      $refId: ID
      $ref: String
      $field: String
      $info: FileInfoInput
    ) {
      upload(
        file: $file
        refId: $refId
        ref: $ref
        field: $field
        info: $info
      ) {
        id
        attributes {
          url
        }
      }
    }
  `;

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
      console.log("newComment", newComment);
      setAllComments((prev) => [newComment, ...prev]);
      setCommentCount((prev) => prev + 1);
    }
  };

  const onValid = (data) => {
    const { content, files } = data;
    console.log(content, files);
    // console.log("files to upload?", files[0]);
    // console.log("uploading", uploadLoading);
    // console.log("error", uploadError);
    if (loading || uploadLoading) {
      return;
    }
    if (error || uploadError) {
      return;
    }
    if (!loggedInUser) {
      return;
    }
    if (!content && !files) {
      return;
    }
    if (files && !content) {
      //https://docs.strapi.io/dev-docs/plugins/upload
      const formData = new FormData();
      formData.append("files", files[0]);
      formData.append("ref", "comment");
      formData.append("refId", episodeId);
      formData.append("field", "image");
      console.log("formData", [...formData.entries()]);
      console.log("file", formData.get("files"));
      upload({
        variables: {
          file: formData,
          refId: formData.get("refId"),
          ref: formData.get("ref"),
          field: formData.get("field"),
          info: {
            alternativeText: "Rarement Comment Image",
            caption: "Rarement Comment Image",
            name: "Rarement Comment Image",
          },
        },
        update: (cache, result) => {
          const {
            data: {
              upload: { id },
            },
          } = result;
          // createComment({
          //   variables: {
          //     content,
          //     episode: episodeId,
          //     publishedAt: new Date().toISOString(),
          //     image: id,
          //     posted_by: loggedInUserId,
          //   },
          // });
          console.log(id);
        },
        //https://github.com/strapi/strapi/issues/5297
        context: {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      });
    }
    if (files.length === 0 && content) {
      createComment({
        variables: {
          content,
          episode: episodeId,
          publishedAt: new Date().toISOString(),
          posted_by: loggedInUserId,
          // image: null,
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
