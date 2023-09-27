import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";

import {
  DiseasesController,
  UsersController,
  HospitalsController,
  DoctorsController,
  PatientsController,
  MedicinesController,
  SpecialitiesController,
  ChatsController,
} from "./controllers";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = new Elysia()
  .use(
    swagger({
      documentation: {
        info: {
          title: "Healthcare API Documentation",
          version: "1.0.0",
        },
      },
    })
  )
  .get("/", () => "Hi")
  .decorate("prisma", new PrismaClient())
  .onStart(() => prisma.$connect())
  .use(cors())
  .use(UsersController(prisma))
  .use(DiseasesController(prisma))
  .use(HospitalsController(prisma))
  .use(DoctorsController(prisma))
  .use(PatientsController(prisma))
  .use(MedicinesController(prisma))
  .use(SpecialitiesController(prisma))
  .use(ChatsController(prisma))
  .onStop(() => prisma.$disconnect())
  .listen(8080);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}
  Swagger UI: http://${app.server?.hostname}:${app.server?.port}/swagger`
);
