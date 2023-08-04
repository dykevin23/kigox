import { Layout, Search } from "@components/layout";
import { signOut } from "next-auth/react";

const Profile = () => {
  return (
    <Layout hasGnbMenu headerProps={{ left: "childSelector" }}>
      <div>
        Profile
        <button onClick={() => signOut()}>로그아웃</button>
      </div>
    </Layout>
  );
};

export default Profile;
