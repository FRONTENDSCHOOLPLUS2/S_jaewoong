import useFetch from "@hooks/useFetch";
import CommentNew from "./CommentNew";
import { Link, useParams } from "react-router-dom";
import userStore, { commentStore } from "@zustand/Store";
import Button from "@components/Button";
import useMutation from "@hooks/useMutation";
import { useState } from "react";

export default function CommentList() {
  const [isEditing,setIsEditing] = useState(false);
  const {key} = userStore((state) => ({
    key: state.key,
  }));
  const {reply_id, setReply_id, setField, commentFix, setCommentFix} = commentStore((state)=> ({
    reply_id: state.reply_id,
    setReply_id: state.setReply_id,
    setField: state.setField,
    commentFix:state.commentFix,
    setCommentFix: state.setCommentFix,
  }));
  const param = useParams();
  const id = param._id;
  const { data, loading, error, refetch } = useFetch(`/posts/${id}/replies`);
  const commentItems = data?.item;
  const myStorage = JSON.parse(sessionStorage.getItem("user-storage"));
  const sessionAccessToken = myStorage.state.accessToken
  const myId = myStorage.state.id
  console.log(commentItems);

  const onChangeFix = (e) => {
    setCommentFix(e.target.value);
  }

const onChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    setField(name, value);
  };

  const handleSave = () => {
    const data = {
      content:commentFix
    }
    const {send} = useMutation(`/posts/${id}/replies/${reply_id}`,sessionAccessToken);
      send({
      method: "PATCH",
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log(response);
        refetch();
        setIsEditing(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  const handleCancel = () => {
    setIsEditing(false)
  }
  
  const handleEdit = (reply_id) => {
    setIsEditing(true);
    setReply_id(reply_id);
    console.log(reply_id)
    
  }
  
  
  const handleDelete =  (reply_id) => {
    setReply_id(reply_id);
    const {send} = useMutation(`/posts/${id}/replies/${reply_id}`,sessionAccessToken);
      send({
      method: "DELETE",
    })
      .then((response) => {
        console.log(response);
        refetch();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <section className="mb-8">
      <h4 className="mt-8 mb-4 ml-2">댓글 {commentItems?.length}개</h4>
      {commentItems?.map((v, i) => (
        <div key={v._id} className="shadow-md rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <img
              className="w-8 mr-2 rounded-full"
              src={key + v.user.profile}
              alt="어피치 프로필 이미지"
            />
            <Link to="" className="text-orange-400">
              {v?.user?.name}
            </Link>
            <time
              className="ml-auto text-gray-500"
              dateTime="2024.07.02 14:11:22"
            >
              {v?.createdAt}
            </time>
            {isEditing && reply_id === v?._id ? (
              <>
                <Button bgColor="gray" size="sm" onClick={handleSave}>
                  저장
                </Button>
                <Button bgColor="orange" size="sm" onClick={handleCancel}>
                  취소
                </Button>
              </>
            ) : (
              v.user._id === myId && (
                <>
                  <Button
                    bgColor="gray"
                    size="sm"
                    onClick={() => handleEdit(v._id)}
                  >
                    수정
                  </Button>
                  <Button
                    bgColor="red"
                    size="sm"
                    onClick={() => handleDelete(v._id)}
                  >
                    삭제
                  </Button>
                </>
              )
            )}
          </div>
          <div>
            {isEditing && reply_id === v?._id ? (
              <textarea
                id="content"
                rows="15"
                placeholder="내용을 입력하세요."
                className="w-full p-4 text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                name="commentFix"
                onChange={onChange}
                value={commentFix}
              ></textarea>
            ) : (
              <pre className="whitespace-pre-wrap text-sm">{v?.content}</pre>
            )}
          </div>
        </div>
      ))}
      <CommentNew refetch={refetch} />
    </section>
  );
}
