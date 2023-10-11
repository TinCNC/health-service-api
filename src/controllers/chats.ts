import { Elysia, t } from "elysia";
import { ChatQuery, CreateChatDTO, UpdateChatDTO } from "../models";
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export const ChatsController = (
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
) =>
  new Elysia()
    .get(
      "/chats",
      ({ query: { message } }) =>
        prisma.chats.findMany({
          where: {
            message: {
              contains: message || undefined,
            },
          },
        }),
      {
        query: ChatQuery,
      }
    )
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
