import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

import { Button, List } from "@components/common/elements";
import { Box, Container, Divider, Layout } from "@components/layout";
import { IChild } from "types/userTypes";
import { useModal } from "@common/hooks";
import { SelectChildren } from "@components/common/ChildSelector";

const Profile = () => {
  const { data: session, update } = useSession();
  const router = useRouter();
  const { show, hide } = useModal();

  console.log(session);

  const getActiveChildName = () => {
    const activeChild = session?.user.children.find(
      (item: IChild) => item.id === parseInt(session.activeChildId)
    );

    return activeChild ? activeChild.nickname : "";
  };

  const handleEditProfile = () => {
    router.push("/profile/update");
  };

  const handleChangeChild = (childId: string) => {
    const getChild = session?.user.children.find(
      (child: IChild) => child.id === parseInt(childId)
    );
    if (getChild) {
      update({ activeChildId: getChild.id });
    }

    hide();
  };

  const handleChildSelector = () => {
    show({
      type: "slide",
      component: (
        <SelectChildren
          childrens={session?.user.children as IChild[]}
          activeChildId={session?.activeChildId as string}
          onChange={handleChangeChild}
        />
      ),
    });
  };

  return (
    <Layout
      hasGnbMenu
      headerProps={{
        left: "search",
        center: (
          <div>
            <span className="text-lg font-bold">KIGOX</span>
          </div>
        ),
        right: <Settings />,
      }}
    >
      <Container>
        <Box>
          <div className="w-full h-24 flex px-2 items-center">
            <div className="w-1/4 pl-1">
              <div className="w-16 h-16 text-white bg-gray-400 rounded-full flex items-center justify-center"></div>
            </div>
            <div className="flex flex-col w-full gap-2">
              <div className="flex w-full justify-between pr-3 pl-7">
                <span>{session?.user.nickname}</span>
                <Button
                  label="프로필 수정"
                  size="small"
                  onClick={handleEditProfile}
                />
              </div>
              {session?.activeChildId !== "" && (
                <div className="flex w-full justify-between">
                  <div className="flex gap-1 pl-7 items-center">
                    <span className="text-sm text-slate-500">자녀</span>
                    <span>{getActiveChildName()}</span>
                  </div>

                  {session?.user.children.length > 1 && (
                    <div className="flex items-center pr-3">
                      <Button
                        label="자녀 변경"
                        size="small"
                        onClick={handleChildSelector}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </Box>

        <Divider />

        <Box>
          <List>
            <Link href="/product/favs">
              <List.Item>
                <List.ItemValue>관심상품</List.ItemValue>
              </List.Item>
            </Link>
            <Link href="/product/sales">
              <List.Item>
                <List.ItemValue>판매상품</List.ItemValue>
              </List.Item>
            </Link>
            <Link href="/product/sales">
              <List.Item>
                <List.ItemValue>구매상품</List.ItemValue>
              </List.Item>
            </Link>
          </List>
        </Box>
      </Container>
    </Layout>
  );
};

const Settings = () => {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
};

export default Profile;
