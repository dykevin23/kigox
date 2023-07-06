import { getSession, useSession } from "next-auth/react";
import { useEffect } from "react";

const Apply = () => {
  // const { data } = useSession();

  // useEffect(() => {
  //   console.log("### session data => ", data);

  //   (async () => {
  //     const session = await getSession();
  //     console.log("### session => ", session);
  //   })();
  // }, [data]);

  return <div>회원가입</div>;
};

export default Apply;
