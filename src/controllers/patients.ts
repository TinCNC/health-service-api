import { Elysia } from "elysia";
import { CreateUserDTO, UpdateUserDTO } from "../models";
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export const PatientsController = (
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
) =>
  new Elysia()
    .get("/users", async () =>
      prisma.users.findMany({
        select: {
          id: true,
          username: true,
          email: true,
          info: true,
          created_at: true,
          updated_at: true,
        },
      })
    )
    .get("/users/:id", ({ params: { id } }) =>
      prisma.users.findFirst({
        select: {
          id: true,
          username: true,
          email: true,
          info: true,
          created_at: true,
          updated_at: true,
        },
        where: {
          id: id,
        },
      })
    )
    .post(
      "/users",
      async ({ body }) => {
        body.password = await Bun.password.hash(body.password);
        // const dob = new Date(body.info.dob);

        // if (isNaN(Date.parse(body.info.dob))) {
        //   console.log("Invalid format");
        // }

        if (!isNaN(Date.parse(body.info.dob))) {
          body.info.dob = new Date().toISOString();
        }

        // console.log(body.info.dob);
        return prisma.users.create({ data: body });
      },
      {
        body: CreateUserDTO,
      }
    )
    .patch(
      "/users/:id",
      async ({ params: { id }, body }) => {
        if (body.password !== undefined) {
          body.password = await Bun.password.hash(body.password);
        }
        if (body.info !== undefined) {
          if (!isNaN(Date.parse(body.info.dob))) {
            body.info.dob = new Date().toISOString();
          }
        }
        return prisma.users.update({
          where: {
            id: id,
          },
          data: body,
        });
      },

      {
        body: UpdateUserDTO,
      }
    )
    .delete("/users/:id", ({ params: { id } }) =>
      prisma.users.delete({ where: { id: id } })
    );
