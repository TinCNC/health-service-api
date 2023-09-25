import { Elysia } from "elysia";
import { CreateDoctorDTO, UpdateDoctorDTO } from "../models";
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export const DoctorsController = (
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
) =>
  new Elysia()
    .get("/doctors", async () =>
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
    .get("/doctors/:id", ({ params: { id } }) =>
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
      "/doctors",
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
        body: CreateDoctorDTO,
      }
    )
    .patch(
      "/doctors/:id",
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
        body: UpdateDoctorDTO,
      }
    )
    .delete("/doctors/:id", ({ params: { id } }) =>
      prisma.users.delete({ where: { id: id } })
    );
