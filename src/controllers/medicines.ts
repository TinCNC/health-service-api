import { Elysia } from "elysia";
import { CreateMedicineDTO, UpdateMedicineDTO } from "../models";
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export const MedicinesController = (
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
) =>
  new Elysia()
    .decorate("medicineQuery", {
      name: true,
      brand: true,
      hospital: true,
      description: true,
      quantity: true,
      price: true,
      image: true,
    })
    .get("/medicines", ({ medicineQuery }) =>
      prisma.medicines.findMany({ select: medicineQuery })
    )
    .get("/medicines/:id", ({ params: { id }, medicineQuery }) =>
      prisma.medicines.findFirst({
        select: medicineQuery,
        where: {
          id: id,
        },
      })
    )
    .post("/medicines", ({ body }) => prisma.medicines.create({ data: body }), {
      body: CreateMedicineDTO,
    })
    .patch(
      "/medicines/:id",
      ({ params: { id }, body }) =>
        prisma.medicines.update({
          where: {
            id: id,
          },
          data: body,
        }),
      {
        body: UpdateMedicineDTO,
      }
    )
    .delete("/medicines/:id", ({ params: { id } }) =>
      prisma.medicines.delete({ where: { id: id } })
    );
