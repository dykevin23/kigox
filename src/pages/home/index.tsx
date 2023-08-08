import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useQuery } from "react-query";
import { useSession } from "next-auth/react";

import { Layout, Box, Like, Search } from "@components/layout";
import Product from "@components/products/product";
import { activeChildAtom } from "@recoil/atoms/users";
import { products } from "@services/products";
import { IChild } from "types/userTypes";

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
    </Layout>
  );
}
