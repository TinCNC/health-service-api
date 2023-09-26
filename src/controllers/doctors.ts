import { Elysia } from "elysia";
import { CreateDoctorDTO, UpdateDoctorDTO } from "../models";
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { generateObjectIdForSubdocumentList } from "../functions";

export const DoctorsController = (
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
) =>
  new Elysia()
    .get("/doctors", async () =>
      prisma.doctors.findMany({
        select: {
          id: true,
          npi: true,
          user_info: true,
          speciality: true,
          gallery: true,
          biography: true,
          work_history: true,
          certificates: true,
          created_at: true,
          updated_at: true,
        },
      })
    )
    .get("/doctors/:id", ({ params: { id } }) =>
      prisma.doctors.findFirst({
        select: {
          id: true,
          npi: true,
          user_info: true,
          speciality: true,
          gallery: true,
          biography: true,
          work_history: true,
          certificates: true,
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
        generateObjectIdForSubdocumentList(body.certificates);
        if (body.gallery !== undefined) {
          generateObjectIdForSubdocumentList(body.gallery);
        }
        if (body.work_history !== undefined) {
          generateObjectIdForSubdocumentList(body.work_history);
        }
        return prisma.doctors.create({ data: body });
      },
      {
        body: CreateDoctorDTO,
      }
    )
    .patch(
      "/doctors/:id",
      async ({ params: { id }, body }) => {
        if (body.certificates !== undefined) {
          generateObjectIdForSubdocumentList(body.certificates);
        }
        if (body.gallery !== undefined) {
          generateObjectIdForSubdocumentList(body.gallery);
        }
        if (body.work_history !== undefined) {
          generateObjectIdForSubdocumentList(body.work_history);
        }
        return prisma.doctors.update({
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
