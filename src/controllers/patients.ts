import { Elysia } from "elysia";
import { CreatePatientDTO, UpdatePatientDTO } from "../models";
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { generateObjectIdForSubdocumentList } from "../functions";

export const PatientsController = (
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
) =>
  new Elysia()
    .get("/patients", async () =>
      prisma.patients.findMany({
        select: {
          id: true,
          user_info: true,
          diseases_history: true,
          created_at: true,
          updated_at: true,
        },
      })
    )
    .get("/patients/:id", ({ params: { id } }) =>
      prisma.patients.findFirst({
        select: {
          id: true,
          user_info: true,
          diseases_history: true,
          created_at: true,
          updated_at: true,
        },
        where: {
          id: id,
        },
      })
    )
    .post(
      "/patients",
      async ({ body }) => {
        if (body.diseases_history !== undefined) {
          generateObjectIdForSubdocumentList(body.diseases_history, true);
        }
        return prisma.patients.create({ data: body });
      },
      {
        body: CreatePatientDTO,
      }
    )
    .patch(
      "/patients/:id",
      async ({ params: { id }, body }) => {
        if (body.diseases_history !== undefined) {
          generateObjectIdForSubdocumentList(body.diseases_history, true);
        }
        return prisma.patients.update({
          where: {
            id: id,
          },
          data: body,
        });
      },

      {
        body: UpdatePatientDTO,
      }
    )
    .delete("/patients/:id", ({ params: { id } }) =>
      prisma.patients.delete({ where: { id: id } })
    );
