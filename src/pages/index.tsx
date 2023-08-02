import { activeChildAtom } from "@recoil/atoms/users";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export default function Enter() {
  const { data: session } = useSession();
  const router = useRouter();

  const [activeChild, setActiveChild] = useRecoilState(activeChildAtom);

  useEffect(() => {
    if (session) {
      const { user } = session;
      if (user?.nickname) {
        if (!activeChild && user.children.length > 0) {
          setActiveChild(user.children[0]);
          localStorage.setItem("activeChildId", user.children[0].id);
        }
        router.push("/home");
      } else {
        router.push("/auth/join");
      }
    }
  }, [session]);

  return <></>;
}
