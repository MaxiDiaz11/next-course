import React from "react";
import { WidgetItem } from "../../components/WidgetItem";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/api/auth/signin");

  return (
    <div className="grid gap-6 grid-cols-1">
      <WidgetItem title="Usuario conectado S-side">
        {
          <div className="flex flex-col text-center">
            <span>{session.user?.name}</span>
            <span> {session.user?.email}</span>
            <span>{session.user?.image}</span>

            <div className="">{JSON.stringify(session)}</div>
          </div>
        }
      </WidgetItem>
    </div>
  );
};

export default DashboardPage;
