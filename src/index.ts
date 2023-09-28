import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";
import { prisma } from "./db";

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
