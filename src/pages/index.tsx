import FloatingButton from "@components/common/elements/FloatingButton";
import { Box, Layout, Like, Search } from "@components/layout";
import Product from "@components/products/product";
import { activeChildAtom } from "@recoil/atoms/users";
import { products } from "@services/products";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { IChild } from "types/userTypes";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  const [activeChild, setActiveChild] = useRecoilState<IChild>(activeChildAtom);

  const { isSuccess, data } = useQuery<any>(
    ["products", activeChild.id],
    () => products({ childId: String(activeChild.id) }),
    { enabled: Boolean(activeChild.id !== 0) }
  );

  useEffect(() => {
    if (session) {
      const { user } = session;
      if (user?.nickname) {
        const getLocalStorageChildId = localStorage.getItem("activeChildId");
        if (activeChild.id === 0) {
          if (user.children.length > 0) {
            if (getLocalStorageChildId) {
              setActiveChild(
                user.children.find(
                  (child: IChild) =>
                    child.id === parseInt(getLocalStorageChildId)
                )
              );
            } else {
              setActiveChild(user.children[0]);
              localStorage.setItem("activeChildId", user.children[0].id);
            }
          } else {
            if (!getLocalStorageChildId)
              localStorage.removeItem("activeChildId");
          }
        }
      } else {
        router.push("/auth/join");
      }
    }
  }, [session]);

  useEffect(() => {
    // console.log("### data => ", data);
    console.log(
      "### result => ",
      data?.children.map((item: any) => {
        return {
          childId: item.childId,
          sum: item.sum,
        };
      })
    );
  }, [data]);

  return (
    <Layout
      hasGnbMenu
      headerProps={{
        left: "childSelector",
        right: (
          <>
            <Like />
            <Search />
          </>
        ),
      }}
    >
      <div className="flex flex-col gap-2">
        <Box>
          <div className="flex items-center justify-center bg-slate-400 h-40">
            slide 영역
          </div>
        </Box>

        <Box>
          <div className="flex flex-col space-y-3 divide-y">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
              <Product key={index} />
            ))}
          </div>
        </Box>
      </div>

      <FloatingButton href="/product/register">
        <svg
          fill="none"
          className="h-6 w-6"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
          ></path>
        </svg>
      </FloatingButton>
    </Layout>
  );
}
