import { Layout, Search } from "@components/layout";

const Profile = () => {
  return (
    <Layout
      hasGnbMenu
      headerProps={{
        title: "PROFILE",
        right: <Search />,
      }}
    >
      <div>Profile</div>
    </Layout>
  );
};

export default Profile;
