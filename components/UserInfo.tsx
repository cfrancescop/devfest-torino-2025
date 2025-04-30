"use client";

import { useContext } from "react";
import { AuthContext } from "../app/loggedLayout";

const UserInfo = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <div>User not logged in</div>;
  }

  return (
    <div>
      <h2>User Information</h2>
      <p>
        <strong>UID:</strong> {user.uid}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Name:</strong> {user.displayName || "N/A"}
      </p>
    </div>
  );
};

export default UserInfo;