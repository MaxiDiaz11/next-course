import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { NextResponse } from "next/server";
import * as yup from "yup";

interface Args {
  params: {
    id: string;
  };
}

const getTodo = async (id: string): Promise<Todo | undefined | null> => {
  const todo = await prisma.todo.findFirst({
    where: { id },
  });

  return todo;
};

export async function GET(request: Request, args: Args) {
  const id = args.params.id;

  const todo = await getTodo(id);

  if (!todo)
    return NextResponse.json(
      { message: `Todo with ${id} not found` },
      { status: 404 }
    );

  return NextResponse.json(todo);
}

const putSchema = yup.object({
  completed: yup.boolean().optional(),
  description: yup.string().optional(),
});

export async function PUT(request: Request, args: Args) {
  try {
    const id = args.params.id;

    const todo = await getTodo(id);

    if (!todo)
      return NextResponse.json(
        { message: `Todo with ${id} not found` },
        { status: 404 }
      );

    const { description, completed } = await putSchema.validate(
      await request.json()
    );

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: {
        description,
        completed,
      },
    });

    return NextResponse.json(updatedTodo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
