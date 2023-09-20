import { signOut } from "next-auth/react";

import { List } from "@components/common/elements";
import { Box, Container, Layout } from "@components/layout";

const MySettings = () => {
  return (
    <Layout
      hasGnbMenu
      headerProps={{
        left: "goBack",
        center: <div>마이페이지</div>,
      }}
    >
      <Container>
        <Box>
          <List>
            <List.Item onClick={() => signOut()}>
              <List.ItemValue>로그아웃</List.ItemValue>
            </List.Item>
          </List>
        </Box>
      </Container>
    </Layout>
  );
};

export default MySettings;
