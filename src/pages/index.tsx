import { Layout, Box, Like, Search } from "@components/layout";
import Product from "@components/products/product";
import { useEffect } from "react";
import { authService } from "../firebase";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (!user) router.push("/auth/login");
    });
  }, []);

  return (
    <Layout
      hasGnbMenu
      headerProps={{
        title: "KIGOX",
        left: <Like />,
        right: <Search />,
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
