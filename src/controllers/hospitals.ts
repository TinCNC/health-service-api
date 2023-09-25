import { Elysia } from "elysia";
import { CreateHospitalDTO, UpdateHospitalDTO } from "../models";
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export const HospitalsController = (
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
) =>
  new Elysia()
    .get("/hospitals", async () =>
      prisma.hospitals.findMany({
        select: {
          id: true,
          name: true,
          location: true,
          capacity: true,
          gallery: true,
          contact_info: true,
          director_info: true,
          created_at: true,
          updated_at: true,
        },
      })
    )
    .get("/hospitals/:id", ({ params: { id } }) =>
      prisma.hospitals.findFirst({
        select: {
          id: true,
          name: true,
          location: true,
          capacity: true,
          gallery: true,
          contact_info: true,
          director_info: true,
          created_at: true,
          updated_at: true,
        },
        where: {
          id: id,
        },
      })
    )
    .post(
      "/hospitals",
      async ({ body }) => {
        // const dob = new Date(body.info.dob);

        // if (isNaN(Date.parse(body.info.dob))) {
        //   console.log("Invalid format");
        // }

        // console.log(body.info.dob);
        return prisma.hospitals.create({ data: body });
      },
      {
        body: CreateHospitalDTO,
      }
    )
    .patch(
      "/hospitals/:id",
      async ({ params: { id }, body }) => {
        return prisma.hospitals.update({
          where: {
            id: id,
          },
          data: body,
        });
      },

      {
        body: UpdateHospitalDTO,
      }
    )
    .delete("/hospitals/:id", ({ params: { id } }) =>
      prisma.users.delete({ where: { id: id } })
    );
