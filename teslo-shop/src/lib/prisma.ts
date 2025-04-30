import { PrismaClient } from "../generated/prisma";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prismaClient: PrismaClientSingleton;
};

const prisma = globalForPrisma.prismaClient || prismaClientSingleton();

if (process.env.NODE_ENV !== "production")
  globalForPrisma.prismaClient = prisma;

export default prisma;
