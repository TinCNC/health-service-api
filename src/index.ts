import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";
// import {
//   DiseasesController,
//   UsersController,
//   HospitalsController,
//   DoctorsController,
// } from "./controllers";

import { PrismaClient } from "@prisma/client";
import { DiseasesController } from "./controllers";

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
  // .use(DiseasesController)
  // .use(UsersController)
  // .use(DoctorsController)
  // .use(HospitalsController)
  // .onStop(() => client.close())
  .listen(8080);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
