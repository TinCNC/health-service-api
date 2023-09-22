import { Elysia } from "elysia";
import { CreateDiseaseDTO, UpdateDiseaseDTO } from "../models";
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export const DiseasesController = (
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
) =>
  new Elysia()
    .get("/diseases", () => prisma.diseases.findMany())
    .get("/diseases/:id", ({ params: { id } }) =>
      prisma.diseases.findFirst({
        where: {
          id: id,
        },
      })
    )
    .post("/diseases", ({ body }) => prisma.diseases.create({ data: body }), {
      body: CreateDiseaseDTO,
    })
    .patch(
      "/diseases/:id",
      ({ params: { id }, body }) =>
        prisma.diseases.update({
          where: {
            id: id,
          },
          data: body,
        }),
      {
        body: UpdateDiseaseDTO,
      }
    )
    .delete("/diseases/:id", ({ params: { id } }) =>
      prisma.diseases.delete({ where: { id: id } })
    );
