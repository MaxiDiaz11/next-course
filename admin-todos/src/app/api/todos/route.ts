import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import * as yup from "yup";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const take = Number(searchParams.get("take") ?? "10");
  const skip = Number(searchParams.get("skip") ?? "0");

  if (isNaN(take))
    return NextResponse.json(
      { message: "Invalid take parameter" },
      { status: 400 }
    );

  if (isNaN(skip))
    return NextResponse.json(
      { message: "Invalid skip parameter" },
      { status: 400 }
    );

  const todos = await prisma.todo.findMany({
    take,
    skip,
  });

  return NextResponse.json(todos);
}

const postSchema = yup.object({
  description: yup.string().required(),
  completed: yup.boolean().optional().default(false),
});

export async function POST(request: Request) {
  try {
    const { description, completed } = await postSchema.validate(
      await request.json()
    );

    await prisma.todo.create({
      data: {
        description,
        completed,
      },
    });

    return NextResponse.json({ message: "Todo created" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 400 });
  }
}

export async function DELETE() {
  try {
    await prisma.todo.deleteMany({
      where: {
        completed: true,
      },
    });

    return NextResponse.json(
      { message: "Completed todos deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 400 });
  }
}
