"use client";

import React, { startTransition, useOptimistic } from "react";
import { Todo } from "@prisma/client";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";
import styles from "./TodoItem.module.css";

interface Props {
  todo: Todo;
  toggleTodo: (id: string, completed: boolean) => Promise<Todo | void>;
}

export const TodoItem = ({ todo, toggleTodo }: Props) => {
  const [todoOptimistc, toggleTodoOptimistc] = useOptimistic(
    todo,
    (state, newCompleteValue: boolean) => ({
      ...state,
      completed: newCompleteValue,
    })
  );

  const onToggleTodo = async () => {
    try {
      startTransition(() => toggleTodoOptimistc(!todoOptimistc.completed));
      await toggleTodo(todoOptimistc.id, !todoOptimistc.completed);
    } catch (error) {
      console.log(error);
      startTransition(() => toggleTodoOptimistc(!todoOptimistc.completed));
    }
  };

  return (
    <div
      className={todoOptimistc.completed ? styles.todoDone : styles.todoPending}
    >
      <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
        <div
          // onClick={() => toggleTodo(todoOptimistc.id, !todoOptimistc.completed)}
          onClick={() => onToggleTodo()}
          className={`flex p-2 rounded-md cursor-pointer hover:bg-opacity-60 bg-blue-100 ${
            todoOptimistc.completed ? "bg-blue-100" : "bg-red-100"
          }`}
        >
          {todoOptimistc.completed ? (
            <IoCheckboxOutline size={30} />
          ) : (
            <IoSquareOutline size={30} />
          )}
        </div>
        <div className="text-center sm:text-left">
          {todoOptimistc.description}
        </div>
      </div>
    </div>
  );
};
