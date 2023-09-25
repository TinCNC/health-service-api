import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";

import {
  DiseasesController,
  UsersController,
  HospitalsController,
  DoctorsController,
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
  .use(cors())
  .onStop(() => prisma.$disconnect())
  .use(DiseasesController(prisma))
  .use(UsersController(prisma))
  .use(DoctorsController(prisma))
  .use(HospitalsController(prisma))
  // .onStop(() => client.close())
  .listen(8080);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}
  Swagger UI: http://${app.server?.hostname}:${app.server?.port}/swagger`
);
