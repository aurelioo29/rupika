import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

const registerSchema = z.object({
  name: z
    .string({
      message: "Nama wajib diisi",
    })
    .trim()
    .min(2, "Nama minimal 2 karakter")
    .max(80, "Nama maksimal 80 karakter"),

  username: z
    .string({
      message: "Username wajib diisi",
    })
    .trim()
    .min(3, "Username minimal 3 karakter")
    .max(30, "Username maksimal 30 karakter")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username hanya boleh huruf, angka, dan underscore",
    )
    .transform((value) => value.toLowerCase()),

  email: z
    .string({
      message: "Email wajib diisi",
    })
    .trim()
    .email("Email tidak valid")
    .max(120, "Email maksimal 120 karakter")
    .transform((value) => value.toLowerCase()),

  password: z
    .string({
      message: "Password wajib diisi",
    })
    .min(8, "Password minimal 8 karakter")
    .max(72, "Password maksimal 72 karakter"),
});

function getErrorMessage(error: unknown) {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "P2002"
  ) {
    return "Email atau username sudah digunakan";
  }

  return "Terjadi kesalahan pada server";
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Data tidak valid",
          errors: parsed.error.flatten().fieldErrors,
        },
        {
          status: 400,
        },
      );
    }

    const { name, username, email, password } = parsed.data;

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email,
          },
          {
            username,
          },
        ],
      },
      select: {
        id: true,
        email: true,
        username: true,
      },
    });

    if (existingUser) {
      const errors: Record<string, string[]> = {};

      if (existingUser.email === email) {
        errors.email = ["Email sudah digunakan"];
      }

      if (existingUser.username === username) {
        errors.username = ["Username sudah digunakan"];
      }

      return NextResponse.json(
        {
          message: "Email atau username sudah digunakan",
          errors,
        },
        {
          status: 409,
        },
      );
    }

    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
        role: "USER",

        wallets: {
          create: [
            {
              name: "Cash",
              type: "CASH",
              initialBalance: 0,
              currentBalance: 0,
            },
          ],
        },

        categories: {
          create: [
            {
              name: "Makanan & Minuman",
              type: "EXPENSE",
              color: "#ef4444",
              icon: "utensils",
            },
            {
              name: "Transportasi",
              type: "EXPENSE",
              color: "#f97316",
              icon: "car",
            },
            {
              name: "Belanja",
              type: "EXPENSE",
              color: "#a855f7",
              icon: "shopping-bag",
            },
            {
              name: "Tagihan",
              type: "EXPENSE",
              color: "#eab308",
              icon: "receipt",
            },
            {
              name: "Gaji",
              type: "INCOME",
              color: "#22c55e",
              icon: "wallet",
            },
            {
              name: "Freelance",
              type: "INCOME",
              color: "#3b82f6",
              icon: "briefcase",
            },
          ],
        },
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        message: "Akun berhasil dibuat",
        user,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("[REGISTER_POST]", error);

    return NextResponse.json(
      {
        message: getErrorMessage(error),
      },
      {
        status: 500,
      },
    );
  }
}
