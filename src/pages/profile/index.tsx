import { Button } from "@components/common/elements";
import { Layout, Search } from "@components/layout";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { IChild } from "types/userTypes";

const Profile = () => {
  const { data: session } = useSession();

  const getActiveChildName = () => {
    const activeChild = session?.user.children.find(
      (item: IChild) => item.id === parseInt(session.activeChildId)
    );

    return activeChild ? activeChild.nickname : "";
  };

  return (
    <Layout hasGnbMenu headerProps={{}}>
      <div className="flex flex-col px-3 py-2 gap-2">
        <div className="w-full h-32">
          <div>
            <div className="w-14 h-14 text-white bg-gray-400 rounded-full flex items-center justify-center"></div>
          </div>
          {session?.activeChildId !== "" && (
            <div className="flex flex-col">
              <div>
                <span>{getActiveChildName()}</span>
              </div>
              {session?.user.children.length > 1 && (
                <div>
                  <Button label="자녀 변경" />
                </div>
              )}
            </div>
          )}
        </div>
        <div>
          <ul>
            <li>관심상품</li>
            <Link href="/product/sales">
              <li>판매상품</li>
            </Link>
            <li>구매상품</li>
            <li>로그아웃</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
