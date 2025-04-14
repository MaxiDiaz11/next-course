import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await prisma.todo.deleteMany({});
  await prisma.user.deleteMany({});

  await prisma.user.create({
    data: {
      email: "test@gmail.com",
      password: bcrypt.hashSync("123456"),
      roles: ["admin"],
      todos: {
        create: [
          { description: "Buy groceries" },
          { description: "Walk the dog" },
          { description: "Do laundry" },
          { description: "Clean the house" },
          { description: "Cook dinner" },
          { description: "Wash the car" },
          { description: "Take out the trash" },
          { description: "Mow the lawn" },
        ],
      },
    },
  });

  // await prisma.todo.createMany({
  //   data: [
  //     { description: "Buy groceries" },
  //     { description: "Walk the dog" },
  //     { description: "Do laundry" },
  //     { description: "Clean the house" },
  //     { description: "Cook dinner" },
  //     { description: "Wash the car" },
  //     { description: "Take out the trash" },
  //     { description: "Mow the lawn" },
  //   ],
  // });

  return NextResponse.json({ message: "Seed executed!" });
}
