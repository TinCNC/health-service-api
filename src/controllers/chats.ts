import { Elysia } from "elysia";
import { CreateChatDTO, UpdateChatDTO } from "../models";
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export const ChatsController = (
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
) =>
  new Elysia()
    .get("/chats", () => prisma.chats.findMany())
    .get("/chats/:id", ({ params: { id } }) =>
      prisma.chats.findFirst({
        where: {
          id: id,
        },
      })
    )
    .post("/chats", ({ body }) => prisma.chats.create({ data: body }), {
      body: CreateChatDTO,
    })
    .patch(
      "/chats/:id",
      ({ params: { id }, body }) =>
        prisma.chats.update({
          where: {
            id: id,
          },
          data: body,
        }),
      {
        body: UpdateChatDTO,
      }
    )
    .delete("/chats/:id", ({ params: { id } }) =>
      prisma.chats.delete({ where: { id: id } })
    );
