export const dynamic = "force-dynamic";
export const revalidate = 0;

import React from "react";
import prisma from "@/lib/prisma";
import { TodoGrid } from "@/todos/components";
import { NewTodo } from "@/components";
import { getUserServerSession } from "@/auth/actions/auth-actions";
import { redirect } from "next/navigation";

const RestTodosPage = async () => {
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
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo />
      </div>

      <TodoGrid todos={todos}></TodoGrid>
    </>
  );
};

export default RestTodosPage;
