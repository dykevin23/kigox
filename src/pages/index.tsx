import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Enter() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      const { user } = session;
      if (user?.nickname) {
        router.push("/home");
      } else {
        router.push("/auth/join");
      }
    }
  }, [session]);

  return <></>;
}
