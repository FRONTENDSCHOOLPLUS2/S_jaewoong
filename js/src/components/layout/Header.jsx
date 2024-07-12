import Button from "@components/Button";
import Theme from "@components/Theme";
import userStore from "@zustand/Store";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const {
    name,
    accessToken,
    refreshToken,
    login,
    setLogin,
    image,
    setImage,
    key,
  } = userStore((state) => ({
    name: state.name,
    accessToken: state.accessToken,
    refreshToken: state.refreshToken,
    login: state.login,
    setLogin: state.setLogin,
    image: state.image,
    key: state.key,
    setImage: state.setImage,
  }));
  const getItem = JSON.parse(sessionStorage.getItem("user-storage"));
  // const accessSessionToken = getItem.state.accessToken;
  // const refreshSessionToken = getItem.state.refreshToken;
  // console.log(img === "https://api.fesp.shop/files/00-sample/Gwk1ft_Fw.png")
  // console.log(key+image.path);
  // const img = key + image?.path;
  const onClickLogin = () => {
    navigate(`/user/login`);
  }
  const onClickLogout = () => {
    navigate(`/info`);
    sessionStorage.clear()
    setLogin(false)
  }
  return (
    <header className="px-8 min-w-80 bg-slate-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 transition-color duration-500 ease-in-out">
      <nav className="flex flex-wrap justify-center items-center p-4 md:flex-nowrap md:justify-between">
        <div className="w-1/2 order-1 md:w-auto">
          <Link href="/" className="flex items-center gap-2">
            <img
              className="mr-3 h-6 sm:h-9"
              src="/images/favicon.svg"
              alt="로고 이미지"
            />
            <span className="text-lg font-bold">멋사컴</span>
          </Link>
        </div>
        <div className="w-auto order-2 text-base mt-4 md:mt-0">
          <ul className="flex items-center gap-6 uppercase">
            <li className="hover:text-amber-500 hover:font-semibold">
              <Link href="/info">정보공유</Link>
            </li>
            <li className="hover:text-amber-500 hover:font-semibold">
              <Link href="/free">자유게시판</Link>
            </li>
            <li className="hover:text-amber-500 a:font-semibold">
              <Link href="/qna">질문게시판</Link>
            </li>
          </ul>
        </div>

        <div className="w-1/2 order-1 flex justify-end items-center md:order-2 md:w-auto">
          {/* <!-- 로그인 후 --> */}
          {/* <!-- */}
          {login  && (
            <p className="flex items-center">
              <img className="w-8 rounded-full mr-2" src={image} />
              {name}
              <Button size="md" bgColor="gray" onClick={onClickLogout}>
                로그아웃
              </Button>
            </p>
          )}
          {/* --> */}

          {/* <!-- 로그인 전 --> */}
          {!login && (
          <div className="flex justify-end">
            <Button type="button" onClick={onClickLogin}>
              로그인
            </Button>
            <Button
              size="sm"
              bgColor="gray"
              onClick={() => navigate(`/user/signup`)}
            >
              회원가입
            </Button>
          </div>)}
          <Theme />
        </div>
      </nav>
    </header>
  );
}
