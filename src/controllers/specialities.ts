import { Elysia } from "elysia";
import { CreateSpecialityDTO, UpdateSpecialityDTO } from "../models";
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export const SpecialitiesController = (
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
) =>
  new Elysia()
    .get("/specialities", () => prisma.specialities.findMany())
    .get("/specialities/:id", ({ params: { id } }) =>
      prisma.specialities.findFirst({
        where: {
          id: id,
        },
      })
    )
    .post(
      "/specialities",
      ({ body }) => prisma.specialities.create({ data: body }),
      {
        body: CreateSpecialityDTO,
      }
    )
    .patch(
      "/specialities/:id",
      ({ params: { id }, body }) =>
        prisma.specialities.update({
          where: {
            id: id,
          },
          data: body,
        }),
      {
        body: UpdateSpecialityDTO,
      }
    )
    .delete("/specialities/:id", ({ params: { id } }) =>
      prisma.specialities.delete({ where: { id: id } })
    );
