import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getProfile, getToken, getTokenProps } from "services/auth";
import { getHello } from "services/hello";

const naverURL = "https://nid.naver.com/oauth2.0/authorize";
const naverClientId = process.env.NEXT_PUBLIC_AUTH_NAVER_CLIENT_ID;
const naverRedirectURL = process.env.NEXT_PUBLIC_AUTH_NAVER_REDIRECT_URL;

const Login = () => {
  const { query } = useRouter();
  const [naverAuthorize, setNaverAuthorize] = useState<getTokenProps>({
    code: "",
    state: "",
  });
  const [isAccessToken, setIsAccessToken] = useState(false);

  const { data, isSuccess, isFetched } = useQuery(
    "getToken",
    () => getToken({ code: naverAuthorize.code, state: naverAuthorize.state }),
    {
      enabled: Boolean(naverAuthorize.code) && Boolean(naverAuthorize.state),
    }
  );

  const { data: profileData, isSuccess: isSuccessProfile } = useQuery(
    "getProfile",
    getProfile,
    { enabled: isAccessToken }
  );

  useEffect(() => {
    console.log("### query => ", query);
    const { code, state } = query;
    if (code && state) {
      setNaverAuthorize({ code: code as string, state: state as string });
    }
  }, [query]);

  useEffect(() => {
    console.log(data, isSuccess);
    if (isSuccess) {
      if (data.status === 200) {
        localStorage.setItem("access_token", data.data.access_token);
        setIsAccessToken(true);
      }
    }
  }, [data, isSuccess]);

  useEffect(() => {
    console.log("### profileData => ", profileData);
    if (isSuccessProfile) {
      console.log("### profileData => ", profileData);
    }
  }, [isSuccessProfile, profileData]);

  useEffect(() => {
    if (isFetched) setNaverAuthorize({ code: "", state: "" });
  }, [isFetched]);

  return (
    <div className="bg-yellow-300 h-screen max-h-screen">
      <div className="flex justify-center items-center pt-48 pb-48">
        <span className="text-6xl">KIGOX</span>
      </div>
      <div className="flex flex-col justify-center items-center gap-2">
        <a
          href={`${naverURL}?response_type=code&client_id=${naverClientId}&redirect_uri=${naverRedirectURL}&state=state`}
        >
          <button className="bg-green-400 w-28 rounded-lg">네이버</button>
        </a>

        <button className="bg-yellow-200 w-28 rounded-lg">카카오</button>
      </div>
    </div>
  );
};

export default Login;
