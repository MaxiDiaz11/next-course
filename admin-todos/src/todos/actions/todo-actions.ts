"use server";

import { getUserServerSession } from "@/auth/actions/auth-actions";
import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const sleep = async (seconds: number = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
};

export const toggleTodo = async (
  id: string,
  completed: boolean
): Promise<Todo> => {
  await sleep(3); // Simulate a delay for the action

  const todo = await prisma.todo.findFirst({
    where: { id },
  });

  if (!todo) throw `Todo with id ${id} not found`;

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { completed: completed },
  });

  revalidatePath("/dashboard/server-todos");

  return updatedTodo;
};

export const createTodo = async (description: string) => {
  try {
    const user = await getUserServerSession();
    const todo = await prisma.todo.create({
      data: {
        description,
        userId: user!.id,
      },
    });

    revalidatePath("/dashboard/server-todos");

    return todo;
  } catch (error) {
    console.log(error);
    return {
      message: "Error creating todo",
    };
  }
};

export const deleteCompleted = async (): Promise<void> => {
  await prisma.todo.deleteMany({
    where: {
      completed: true,
    },
  });
  revalidatePath("/dashboard/server-todos");
};
