import { useNavigate, useParams } from "react-router-dom";
import CommentList from "./CommentList";
import useFetch from "@hooks/useFetch";
import Button from "@components/Button";
import useMutation from "@hooks/useMutation";

export default function Detail() {
  const navigate = useNavigate();
  const param = useParams();
  const id = param._id
  const { data } = useFetch(`/posts/${id}`);
  const myStorage = JSON.parse(sessionStorage.getItem("user-storage"));
  const sessionAccessToken = myStorage.state.accessToken;
  const sessionId = myStorage.state.id;
  const userId = data?.item.user._id;
  console.log(data?.item?.user)
  const { send }= useMutation(`/posts/${id}`,sessionAccessToken);
  const handleDetailFix = () => {
    navigate(`/info/1/edit`);
  }
  const hnadleDetailDelete = () => {
    send({
      method: "DELETE",
    })
    .then((response) => {
      console.log(response);
      navigate(`/info`);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <main className="container mx-auto mt-4 px-4">
      <section className="mb-8 p-4">
        <div className="font-semibold text-xl">{data?.item.title}</div>
        <div className="text-right text-gray-400">
          작성자 : {data?.item?.user?.name}
        </div>
        <div className="mb-4">
          <div>
            <pre className="font-roboto w-full p-2 whitespace-pre-wrap">
              {data?.item.content}
            </pre>
          </div>
          <hr />
        </div>
        <div className="flex justify-end my-4">
          <Button onClick={() => history.back()}>목록</Button>
          {
          userId == sessionId&&
          (
          <>
            <Button bgColor="gray" onClick={handleDetailFix}>
              수정
            </Button>
            <Button bgColor="red" onClick={hnadleDetailDelete}>
              삭제
            </Button>
          </>
          )

          }
        </div>
      </section>
      <CommentList />
    </main>
  );
}
