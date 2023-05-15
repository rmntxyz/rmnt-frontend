import { gql, useMutation } from "@apollo/client";
import { faTurnUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";

export default function ReplyInput({
  commentId,
  setReplyCount,
  setAllComments,
}) {
  const CREATE_REPLY = gql`
    mutation CreateReply(
      $content: String
      $comment: ID
      $publishedAt: DateTime
    ) {
      createReply(
        data: {
          content: $content
          comment: $comment
          publishedAt: $publishedAt
        }
      ) {
        data {
          id
          attributes {
            content
            publishedAt
            comment {
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

  const createReplyUpdate = (cache, result) => {
    const {
      data: {
        createReply: { data: newReply },
      },
    } = result;
    if (newReply) {
      setReplyCount((prev) => prev + 1);
      setAllComments((prev) => {
        const newComments = prev.map((comment) => {
          if (comment.id === commentId) {
            comment.attributes.replies.data.push(newReply);
          }
          return comment;
        });
        return newComments;
      });
    }
  };

  const onValid = (data) => {
    const { content } = data;
    if (loading) {
      return;
    }
    createReply({
      variables: {
        content,
        comment: commentId,
        publishedAt: new Date().toISOString(),
      },
    });
    setValue("content", "");
  };

  const [createReply, { loading }] = useMutation(CREATE_REPLY, {
    update: createReplyUpdate,
  });

  return (
    <div className="flex items-center gap-2">
      <FontAwesomeIcon
        icon={faTurnUp}
        rotation={90}
        className="text-mintGreen"
      />
      <form
        onSubmit={handleSubmit(onValid)}
        className="my-1 border border-mintGreen rounded-full w-full"
      >
        <input
          {...register("content", { required: true })}
          type="text"
          placeholder="Write a comment"
          className="input z-20 w-full p-2 rounded-full bg-opaqueGray focus:outline-none"
        />
      </form>
    </div>
  );
}
