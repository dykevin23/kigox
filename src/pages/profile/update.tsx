import { Container, Layout } from "@components/layout";

const UpdateProfile = () => {
  return (
    <Layout
      hasGnbMenu
      hasHeader
      headerProps={{
        left: "goBack",
        center: <div>프로필 수정</div>,
      }}
    >
      <Container>
        <div>update profile</div>
      </Container>
    </Layout>
  );
};

export default UpdateProfile;
