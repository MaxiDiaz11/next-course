import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await prisma.todo.deleteMany({});

  await prisma.todo.createMany({
    data: [
      { description: "Buy groceries" },
      { description: "Walk the dog" },
      { description: "Do laundry" },
      { description: "Clean the house" },
      { description: "Cook dinner" },
      { description: "Wash the car" },
      { description: "Take out the trash" },
      { description: "Mow the lawn" },
    ],
  });

  return NextResponse.json({ message: "Seed executed!" });
}
