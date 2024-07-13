import Button from '@components/Button'
import useMutation from '@hooks/useMutation'
import { commentStore } from '@zustand/Store';
import { useParams } from 'react-router-dom';

export default function CommentNew({refetch}) {
  const getItem = JSON.parse(sessionStorage.getItem("user-storage"));
  // const id = myStorage.state.id
  const accessSessionToken = getItem.state.accessToken;
  const param = useParams();
  const id = param._id;
  const {comment, setComment, setField} = commentStore((state)=>({
    comment:state.comment,
    setComment: state.setComment,
    setField: state.setField,
  }))

  const onChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    setField(name, value);
  };
 
  const { send } = useMutation(`/posts/${id}/replies`, accessSessionToken);
  const onClickComment = () => {
    const data = {
      content: comment
    }

    send({
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log(response);
        refetch();
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  return (
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="mb-4">새로운 댓글을 추가하세요.</h4>
              <form>
                <div className="mb-4">
                  <textarea
                    rows="3"
                    cols="40"
                    className="block p-2 w-full text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="내용을 입력하세요."
                    name="comment"
                    value={comment}
                    onChange={onChange}
                    ></textarea>
        

                  {/* <!-- 에러 메세지 출력 -->
                  <!--
                  <p className="ml-2 mt-1 text-sm text-red-500">
                    에러 메세지
                  </p>
                  --> */}
                  
                </div>
                <Button size="sm" onClick={onClickComment}>댓글 등록</Button>
              </form>
            </div>
  )
}
