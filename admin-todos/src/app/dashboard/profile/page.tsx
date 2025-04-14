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
        <span>{session?.user?.id}</span>
        <span>{session?.user?.name}</span>
        <span>{session?.user?.email}</span>
        <span>{session?.user?.image}</span>
        <span>{session?.user?.roles?.join(", ")}</span>
      </div>
    </div>
  );
};

export default ProfilePage;
