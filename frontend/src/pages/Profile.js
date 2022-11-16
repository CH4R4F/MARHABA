import React, { useEffect, useState } from "react";
import ProfileCard from "../components/profile/profileCard";
import usePrivateAxios from "../hooks/usePrivateAxios";
import useAuth from "../hooks/useAuth";

const Profile = () => {
  const [user, setUser] = useState(null);
  const privateAxios = usePrivateAxios();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await privateAxios.get("/api/user/client/me");
      setUser(data);
    };
    fetchUser();
  });

  if (user) {
    console.log(user);
  }
  return <div>{user && <ProfileCard user={user} />}</div>;
};

export default Profile;
