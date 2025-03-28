import React from "react";
import prisma from "@/lib/prisma";
import { TodoGrid } from "@/todos/components";
import { NewTodo } from "@/components";

const ServerTodosPage = async () => {
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
      <span className="text-3xl mb-20">Server actions</span>
      <div className="w-full px-3 mx-5 mb-5 mt-5">
        <NewTodo />
      </div>

      <TodoGrid todos={todos}></TodoGrid>
    </>
  );
};

export default ServerTodosPage;
