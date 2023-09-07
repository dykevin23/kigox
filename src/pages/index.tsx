import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useInfiniteQuery } from "react-query";

import {
  Box,
  Container,
  InfiniteScroll,
  Layout,
  Like,
  Search,
} from "@components/layout";
import Product from "@components/products/product";
import { products } from "@services/products";
import { Button, FloatingButton } from "@components/common/elements";
import { IProduct } from "types/productTypes";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  const {
    data: productList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<IProduct[]>(
    ["products", session?.activeChildId],
    ({ pageParam = 1 }) => products({ pageNo: pageParam }),
    {
      enabled: Boolean(session?.activeChildId),
      // enabled: false,
      getNextPageParam: (lastPage, pages) => {
        console.log("### getNextPageParam => ", lastPage, pages);
        const lastPageLength = lastPage.length;
        return lastPageLength > 0 ? pages.length + 1 : false;
      },
    }
  );

  useEffect(() => {
    if (session) {
      const { user } = session;
      if (user?.nickname) {
      } else {
        router.push("/auth/join");
      }
    }
  }, [session]);

  const handleScroll = () => {
    console.log("### handleScroll => ", hasNextPage, isFetchingNextPage);
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

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
      <Container>
        <Box>
          <div className="flex items-center justify-center bg-slate-400 h-40">
            slide 영역
          </div>
        </Box>

        <Box>
          <InfiniteScroll onScroll={handleScroll}>
            <div className="flex flex-col space-y-3 divide-y">
              {productList?.pages
                .flatMap((page) => page)
                ?.map((product) => (
                  <Product key={product.id} product={product} />
                ))}
            </div>
          </InfiniteScroll>
        </Box>
      </Container>

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
