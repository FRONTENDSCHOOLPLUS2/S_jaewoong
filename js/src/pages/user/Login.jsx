import Submit from '@components/Submit';
import userStore from '@zustand/Store';
import { Link } from 'react-router-dom';

export default function Login() {
  const { email, password, setField, accessToken,setAccessToken, setRefreshToken, setName, setImage, login, setLogin,key,id,setId } =
    userStore((state) => ({
      email: state.email,
      password: state.password,
      setField: state.setField,
      setAccessToken: state.setAccessToken,
      setRefreshToken: state.setRefreshToken,
      setName: state.setName,
      setImage: state.setImage,
      login: state.login,
      setLogin: state.setLogin,
      key: state.key,
      accessToken:state.accessToken,
      id:state.id,
      setId: state.setId,
    }));

const getItem = JSON.parse(sessionStorage.getItem("user-storage"));
const accessSessionToken = getItem.state.accessToken;

  const onChange = (e) => {
    const { name, value } = e.target;
    // console.log(name)
    // console.log(value)
    setField(name, value);
  };

  const onSubmitLogin = async (e)=>{
    e.preventDefault();
    history.back();
    const data = {
      "email": email,
      "password": password
    }
    try{
      const response = await fetch("https://api.fesp.shop/users/login",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify(data)
      })
      if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    console.log('rs',result)
    setAccessToken(result.item.token.accessToken);
    setRefreshToken(result.item.token.refreshToken);
    setName(result.item.name);
    setImage(key + result.item.profileImage.path);
    setId(result.item._id);
    accessToken == accessSessionToken ? setLogin(true) : setLogin(false);
  }
  catch(err){
      console.error(err)
    }
  };

  return (
    <main className="min-w-80 flex-grow flex items-center justify-center">
      <div className="p-8 border border-gray-200 rounded-lg w-full max-w-md dark:bg-gray-600 dark:border-0">
        <div className="text-center py-4">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
            로그인
          </h2>
        </div>

        <form onSubmit={onSubmitLogin}>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="email"
            >
              이메일
            </label>
            <input
              id="email"
              type="email"
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
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              name="password"
              value={password}
              onChange={onChange}
            />
            {/* <!-- 입력값 검증 에러 출력 -->
                <!-- <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">에러 메세지</p> --> */}
            <Link
              href="#"
              className="block mt-6 ml-auto text-gray-500 text-sm dark:text-gray-300 hover:underline"
            >
              비밀번호를 잊으셨나요?
            </Link>
          </div>
          <div className="mt-10 flex justify-center items-center">
            <Submit>로그인</Submit>
            <Link
              href="/user/signup"
              className="ml-8 text-gray-800 hover:underline"
            >
              회원가입
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
