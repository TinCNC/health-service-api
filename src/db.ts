import { PrismaClient } from "@prisma/client";
import { prisma as prismaAdapter } from "@lucia-auth/adapter-prisma";
import { lucia } from "lucia";
import { elysia } from "lucia/middleware";

export const prisma = new PrismaClient();

export const auth = lucia({
  env: "DEV", // "PROD" if deployed to HTTPS
  middleware: elysia(),
  adapter: prismaAdapter(prisma, {
    user: "users",
    session: "sessions",
    key: "keys",
  }),

  getUserAttributes: (data) => {
    return {
      username: data.username,
      email: data.email,
    };
  },
});

export type Auth = typeof auth;
