export const dynamic = "force-dynamic"; // Force revalidation on every request
export const revalidate = 0; // Disable static generation for this page

import React from "react";
import prisma from "@/lib/prisma";
import { TodoGrid } from "@/todos/components";
import { NewTodo } from "@/components";
import { getUserServerSession } from "@/auth/actions/auth-actions";
import { redirect } from "next/navigation";

const ServerTodosPage = async () => {
  // useEffect(() => {
  //   fetch("/api/todos").then((res) => {
  //     res.json().then((data) => {
  //       console.log(data);
  //     });
  //   });
  // }, []);

  const user = await getUserServerSession();

  if (!user) redirect("/api/auth/signin");

  const todos = await prisma.todo.findMany({
    orderBy: { description: "asc" },
    where: {
      userId: user.id,
    },
  });

  return (
    <>
      <span className="text-3xl mb-20">Server actions</span>
      <div className="w-full px-3 mx-5 mb-5 mt-5">
        <NewTodo />
      </div>

      <TodoGrid todos={todos}></TodoGrid>
    </>
  );
};

export default ServerTodosPage;
