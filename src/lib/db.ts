import 'server-only';
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient({
  log: ["query", "error"],
});

export default prisma;