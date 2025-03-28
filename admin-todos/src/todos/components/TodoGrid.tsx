"use client";

import React from "react";
import { Todo } from "@prisma/client";
import { TodoItem } from "./TodoItem";
import * as api from "@/todos/helpers/todos";
import { useRouter } from "next/navigation";

interface Props {
  todos?: Todo[];
}

export const TodoGrid = ({ todos }: Props) => {
  const router = useRouter();

  const toggleTodo = (id: string, completed: boolean) => {
    const updatedTodo = api.updateTodo(id, completed);
    router.refresh();

    return updatedTodo;
  };

  return (
    <div className="grid grid-cols-1  sm:grid-cols-3 gap-2">
      {todos?.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo}></TodoItem>
      ))}
    </div>
  );
};
