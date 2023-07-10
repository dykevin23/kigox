import { getToken } from "next-auth/jwt";
import { getCsrfToken, getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Apply = () => {
  const { data } = useSession();

  const router = useRouter();

  useEffect(() => {
    console.log("### session data => ", data);

    (async () => {
      const user = await getSession();
      // const token = await getToken();
      const token = await getCsrfToken();
      console.log("### getSession => ", user, token);
    })();
  }, [data]);

  useEffect(() => {
    console.log("### router => ", router);
  }, [router]);

  return <div className="bg-yellow-300 h-screen max-h-screen"></div>;
};

export default Apply;
