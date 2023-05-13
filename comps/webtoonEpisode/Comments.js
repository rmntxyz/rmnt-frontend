import { useForm } from "react-hook-form";
import Comment from "./Comment";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

export default function Comments({ comments, episodeId }) {
  const [allComments, setAllComments] = useState(comments);
  const [commentCount, setCommentCount] = useState(comments.length);

  const CREATE_COMMENT = gql`
    mutation CreateComment(
      $content: String
      $episode: ID
      $publishedAt: DateTime
    ) {
      createComment(
        data: {
          content: $content
          episode: $episode
          publishedAt: $publishedAt
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
          }
        }
      }
    }
  `;

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

  const onValid = (data) => {
    const { content } = data;
    if (loading) {
      return;
    }
    createComment({
      variables: {
        content,
        episode: episodeId,
        publishedAt: new Date().toISOString(),
      },
    });
    setValue("content", "");
  };
  const [createComment, { loading, error }] = useMutation(CREATE_COMMENT, {
    update: createCommentUpdate,
  });

  return (
    <div id="comments" className="py-8 mx-auto max-w-[768px] md:max-w-[630px]">
      <h2 className="mb-4 text-2xl font-bold">
        {commentCount} {commentCount === 1 ? "Comment" : "Comments"}
      </h2>
      <form
        onSubmit={handleSubmit(onValid)}
        className="my-3 border-2 border-mintGreen rounded-full"
      >
        <input
          {...register("content", { required: true })}
          type="text"
          placeholder="Write a comment"
          className="w-full p-3 rounded-full bg-opaqueGray focus:outline-none"
        />
      </form>
      <div className="flex flex-col gap-4">
        {allComments.map((comment, idx) => (
          <Comment
            key={idx}
            comment={comment}
            setAllComments={setAllComments}
            setCommentCount={setCommentCount}
          />
        ))}
      </div>
    </div>
  );
}
