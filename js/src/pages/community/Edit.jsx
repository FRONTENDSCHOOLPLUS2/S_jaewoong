import Button from "@components/Button";
import useMutation from "@hooks/useMutation";
import { useState } from "react";

export default function Edit() {
  const postId = 
  const [title,setTitle] = useState("");
  const [content,setContent] = useState("");
  const onChangeTitle = (e) => {
    setTitle(e.target.value);
    console.log(e.target.value)
  }
  const onChangeContent = (e) => {
    setContent(e.target.value);
    console.log(e.target.value)
  }
  
  const { send }= useMutation(`posts/${postId}`)
  return (
    <main className="min-w-[320px] p-4">
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
          게시글 수정
        </h2>
      </div>
      <section className="mb-8 p-4">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            history.back();
          }}
        >
          <div className="my-4">
            <label className="block text-lg content-center" htmlFor="title">
              제목
            </label>
            <input
              type="text"
              placeholder="제목을 입력하세요."
              className="w-full py-2 px-4 border rounded-md dark:bg-gray-700 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              name="title"
              value={title}
              onChange={onChangeTitle}
            />
            {/* <!-- 입력값 검증 에러 출력 -->
                <!-- <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">에러 메세지</p> --> */}
          </div>
          <div className="my-4">
            <label className="block text-lg content-center" htmlFor="content">
              내용
            </label>
            <textarea
              rows="15"
              placeholder="내용을 입력하세요."
              className="w-full p-4 text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              name="content"
              value={content}
              onChange={onChangeContent}
            >
              가입인사 드립니다 반가워요
            </textarea>
            {/* <!-- 입력값 검증 에러 출력 -->
                <!-- <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">에러 메세지</p> --> */}
          </div>
          <hr />
          <div className="flex justify-end my-6">
            <Button>수정</Button>
            <Button type="reset" bgColor="gray" onClick={() => history.back()}>
              취소
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
}
