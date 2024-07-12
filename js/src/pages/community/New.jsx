import Button from "@components/Button";
import Submit from "@components/Submit";
import useMutation from "@hooks/useMutation";
import userStore, { postStore } from "@zustand/Store";

export default function New() {
  const getItem = JSON.parse(sessionStorage.getItem("user-storage"));
  const accessSessionToken = getItem.state.accessToken;
  const {send} = useMutation("/posts",accessSessionToken);
  // console.log(accessSessionToken);
  const {title,setTitle,content,setContent,setField} = postStore((state) => ({
    title: state.title,
    setTitle: state.setTitle,
    setField: state.setField,
    content: state.content,
    setContent: state.setContent,
  }))

    const onChange = (e) => {
    const { name, value } = e.target;
    console.log(name)
    console.log(value)
    setField(name, value);
  };


  const OnSubmitForm = (e) => {
    e.preventDefault();
    history.back();
    const data = {
      title: title,
      content: content
    }
    
  send({
  method: "POST",
  body: JSON.stringify(data),
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
    
  }
  return (
    <main className="min-w-[320px] p-4">
          <div className="text-center py-4">
            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">게시글 등록</h2>
          </div>
          <section className="mb-8 p-4">
            <form onSubmit={OnSubmitForm}>
              <div className="my-4">
                <label className="block text-lg content-center" htmlFor="title">제목</label>
                <input
                  id="title"
                  type="text"
                  placeholder="제목을 입력하세요." 
                  className="w-full py-2 px-4 border rounded-md dark:bg-gray-700 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  name="title"
                  value={title}
                  onChange={onChange}
                />
                {/* <!-- 입력값 검증 에러 출력 -->
                <!-- <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">에러 메세지</p> --> */}
              </div>
              <div className="my-4">
                <label className="block text-lg content-center" htmlFor="content">내용</label>
                <textarea 
                  id="content"
                  rows="15" 
                  placeholder="내용을 입력하세요."
                  className="w-full p-4 text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  name="content"
                  value={content}
                  onChange={onChange}
                ></textarea>
                {/* <!-- 입력값 검증 에러 출력 -->
                <!-- <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">에러 메세지</p> --> */}
              </div>
              <hr />
              <div className="flex justify-end my-6">
                <Submit>등록</Submit>
                <Button type="reset" bgColor="gray" onClick={() => history.back()}>취소</Button>
              </div>
            </form>
          </section>
        </main>
  )
}
