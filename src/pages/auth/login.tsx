import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Login = () => {
  return (
    <div className="bg-yellow-300 h-screen max-h-screen">
      <div className="flex justify-center items-center pt-48 pb-48">
        <span className="text-6xl">KIGOX</span>
      </div>
      <div className="flex flex-col justify-center items-center gap-2">
        <button
          className="bg-green-400 w-28 rounded-lg"
          onClick={() => signIn("naver")}
        >
          네이버
        </button>
        <button
          className="bg-yellow-200 w-28 rounded-lg"
          onClick={() => signIn("kakao")}
        >
          카카오
        </button>
      </div>
    </div>
  );
};

export default Login;
