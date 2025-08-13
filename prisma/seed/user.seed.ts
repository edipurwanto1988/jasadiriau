import { PrismaClient, Role } from "@/generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const userSeed = async () => {
  const hashedPassword = await bcrypt.hash("123456", 10);

  const users = [
    {
      email: "admin@email.com",
      name: "admin",
      password: hashedPassword,
      phoneNumber: "000000000000",
      role: Role.user,
      isActive:true
    },
  ];

  await Promise.all(
    users.map((user) =>
      prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: user,
      })
    )
  ).then(() => prisma.$disconnect());
};

export default userSeed;
