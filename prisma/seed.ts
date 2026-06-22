import "dotenv/config";
import { hash } from "bcryptjs";
import { PrismaClient } from "./src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const password = await hash("password123", 10);

  const user = await prisma.user.upsert({
    where: {
      email: "admin@rupika.local",
    },
    update: {
      username: "admin",
      password,
      role: "SUPERADMIN",
    },
    create: {
      name: "Admin Rupika",
      username: "admin",
      email: "admin@rupika.local",
      password,
      role: "SUPERADMIN",
    },
  });

  console.log("Seed berhasil:", {
    email: user.email,
    username: user.username,
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
