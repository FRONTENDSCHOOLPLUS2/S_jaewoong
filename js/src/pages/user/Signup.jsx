import Button from "@components/Button";
import Submit from "@components/Submit";
import userStore from "@zustand/Store";

export default function Signup() {
  let { email, password, name, setField, image, setImage } = userStore((state) => ({
    email: state.email,
    password: state.password,
    name: state.name,
    type: "user",
    setField: state.setField,
    setImage: state.setImage,
    image: state.image,
  }));

  const onChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    setField(name, value);
  };

  const onChangeImage = (e) =>{
    setImage(e.target.files[0]);
  }
  
  const onSubmitSignup = async (e) => {
    e.preventDefault();
    history.back();
    const formData = new FormData();
    formData.append('attach', image);
    let img;
    try{
    const response = await fetch("https://api.fesp.shop/files", {
      method: "POST",
      headers: {},
      body: formData,
    });
      if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    console.log(result);
    img = result.item[0];
    // console.log(image)
    // console.log(result.item[0].originalname);
  }
  catch(err){
      console.error(err)
    }
    const data = {
      email: email,
      password: password,
      name: name,
      type: "user",
      profileImage: img,
    };
    console.log(data)
    try{
      const response = await fetch("https://api.fesp.shop/users",{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body:JSON.stringify(data)
        })
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log(result);
        setImage(img);
    }catch(err){
      console.error(err)
    }

    };

  return (
    <main className="min-w-80 flex-grow flex items-center justify-center">
      <div className="p-8  border border-gray-200 rounded-lg w-full max-w-md dark:bg-gray-600 dark:border-0">
        <div className="text-center py-4">
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
            회원 가입
          </h2>
        </div>

        <form onSubmit={onSubmitSignup}>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="name"
            >
              이름
            </label>
            <input
              type="text"
              id="name"
              placeholder="이름을 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              name="name"
              value={name}
              onChange={onChange}
            />
            {/* <!-- 입력값 검증 에러 출력 -->
                <!-- <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">에러 메세지</p> --> */}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="email"
            >
              이메일
            </label>
            <input
              type="email"
              id="email"
              placeholder="이메일을 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              name="email"
              value={email}
              onChange={onChange}
            />
            {/* <!-- 입력값 검증 에러 출력 -->
                <!-- <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">에러 메세지</p> --> */}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="password"
            >
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              placeholder="비밀번호를 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              name="password"
              autoComplete="false"
              value={password}
              onChange={onChange}
            />
            {/* <!-- 입력값 검증 에러 출력 -->
                <!-- <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">에러 메세지</p> --> */}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="profileImage"
            >
              프로필 이미지
            </label>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              placeholder="이미지를 선택하세요"
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
              name="profileImage"
              onChange={(onChangeImage)}
            />
          </div>

          <div className="mt-10 flex justify-center items-center">
            <Submit>회원가입</Submit>
            <Button type="reset" bgColor="gray" onClick={() => history.back()}>
              취소
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
