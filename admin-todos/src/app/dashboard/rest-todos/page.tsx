export const dynamic = "force-dynamic";
export const revalidate = 0;

import React from "react";
import prisma from "@/lib/prisma";
import { TodoGrid } from "@/todos/components";
import { NewTodo } from "@/components";

const RestTodosPage = async () => {
  // useEffect(() => {
  //   fetch("/api/todos").then((res) => {
  //     res.json().then((data) => {
  //       console.log(data);
  //     });
  //   });
  // }, []);

  const todos = await prisma.todo.findMany({ orderBy: { description: "asc" } });

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
