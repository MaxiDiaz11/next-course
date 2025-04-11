"use client";

import React from "react";
import { useSession } from "next-auth/react";

const ProfilePage = () => {
  const { data: session } = useSession();

  return (
    <div>
      <h1>Page profile</h1>
      <hr />
      <div className="flex flex-col">
        <span>{session?.user?.name}</span>
        <span>{session?.user?.email}</span>
        <span>{session?.user?.image}</span>
      </div>
    </div>
  );
};

export default ProfilePage;
