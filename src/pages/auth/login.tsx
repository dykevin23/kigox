import { useRouter } from "next/router";
import { useEffect } from "react";

const Login = () => {
  const { query } = useRouter();
  useEffect(() => {
    console.log("### query => ", query);
  }, [query]);
  return (
    <div className="bg-yellow-300 h-screen max-h-screen">
      <div className="flex justify-center items-center pt-48 pb-48">
        <span className="text-6xl">KIGOX</span>
      </div>
      <div className="flex flex-col justify-center items-center gap-2">
        <a
          href={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=N6weV1qTYc31RnlUnLxH&redirect_uri=https://kigox.vercel.app&state=state`}
        >
          <button className="bg-green-400 w-28 rounded-lg">네이버</button>
        </a>

        <button className="bg-yellow-200 w-28 rounded-lg">카카오</button>
      </div>
    </div>
  );
};

export default Login;
