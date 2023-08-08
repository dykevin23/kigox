import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useQuery } from "react-query";
import { useSession } from "next-auth/react";

import { Layout, Box, Like, Search } from "@components/layout";
import Product from "@components/products/product";
import { activeChildAtom } from "@recoil/atoms/users";
import { products } from "@services/products";
import { IChild } from "types/userTypes";
import FloatingButton from "@components/common/elements/FloatingButton";

export default function Home() {
  const { data: session } = useSession();
  const [activeChild, setActiveChild] = useRecoilState<IChild>(activeChildAtom);

  const { isSuccess, data } = useQuery<any>(
    ["products", activeChild.id],
    () => products({ childId: String(activeChild.id) }),
    { enabled: Boolean(activeChild?.id) }
  );

  useEffect(() => {
    if (session && !activeChild.id) {
      const activeChildId = localStorage.getItem("activeChildId");
      if (activeChildId) {
        setActiveChild(
          session?.user.children.find(
            (child: IChild) => String(child.id) === activeChildId
          ) as IChild
        );
      } else {
        setActiveChild(session?.user.children[0]);
      }
    }
  }, [activeChild, session]);

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
          stroke-width="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
          ></path>
        </svg>
      </FloatingButton>
    </Layout>
  );
}
