import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useTimeLapsed from "../../utils/useTimeLapsed";
import { faTurnUp, faXmark } from "@fortawesome/free-solid-svg-icons";
import { gql, useMutation } from "@apollo/client";
import Image from "next/image";

export default function Reply({
  reply,
  setAllReplies,
  setReplyCount,
  loggedInUserId,
}) {
  console.log(reply);
  const { minutesLapsed, hoursLapsed, daysLapsed } = useTimeLapsed({
    publishedAt: reply.attributes.publishedAt,
  });

  const isMyReply = loggedInUserId === reply.attributes.posted_by.data.id;

  const DELETE_REPLY = gql`
    mutation DeleteReply($id: ID!) {
      deleteReply(id: $id) {
        data {
          id
        }
      }
    }
  `;

  const deleteReplyUpdate = (cache, result) => {
    const {
      data: {
        deleteReply: { data: deletedReply },
      },
    } = result;
    if (deletedReply) {
      setAllReplies((prev) =>
        prev.filter((reply) => reply.id !== deletedReply.id)
      );
      setReplyCount((prev) => prev - 1);
    }
  };

  const [deleteReply, { loading }] = useMutation(DELETE_REPLY, {
    update: deleteReplyUpdate,
  });

  const onDeleteClick = () => {
    if (loading) {
      return;
    }
    deleteReply({
      variables: {
        id: reply.id,
      },
    });
  };

  return (
    <div key={reply.id} className="flex gap-2 items-center">
      <FontAwesomeIcon icon={faTurnUp} rotation={90}></FontAwesomeIcon>
      <div className="flex gap-2 items-center">
        {/* <div className="flex-shrink-0">
                <img
                  className="w-10 h-10 rounded-full"
                  src={reply.user.data.attributes.avatar.url} 
                  alt={reply.user.data.attributes.username}
                />
              </div> */}

        {/* <h3 className="text-lg font-bold">
                    {reply.user.data.attributes.username}
                  </h3> */}
        <Image
          className="rounded-full"
          src="/profile/popup_profile.png"
          width={24}
          height={24}
          alt={
            reply.attributes.posted_by?.data
              ? reply.attributes.posted_by.data.attributes.username
              : "Rarement User Image"
          }
          style={{ width: "auto", height: "auto" }}
        />
        <h3 className="font-bold truncate max-w-[64px]">
          {reply.attributes.posted_by?.data
            ? reply.attributes.posted_by.data.attributes.username
            : "User"}
        </h3>
        <p className="text-sm">{reply.attributes.content}</p>
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
        <button
          className="button z-50 text-sm text-mintRed"
          style={{
            display: isMyReply ? "block" : "none",
          }}
        >
          <FontAwesomeIcon
            icon={faXmark}
            onClick={onDeleteClick}
          ></FontAwesomeIcon>
        </button>
      </div>
    </div>
  );
}
