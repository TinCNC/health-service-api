import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";
import {
  DiseasesController,
  UsersController,
  HospitalsController,
} from "./controllers";
import { client } from "./db";

// const kernel = new Kernel({
//   bundles: [
//     // Toolkit that maybe opens an express server and makes it easy for the user to create routes
//     new APIBundle(),

//     // Integrates with a database giving you access to use it
//     new DatabaseBundle({
//       uri: "acmesql://127.0.0.2/shop",
//     }),

//     // Here we work with our available modules to create an application
//     new ApplicationBundle(),
//   ],
// });

// const client = new MongoBundle({
//   uri: "mongodb+srv://geo.cuj0ztx.mongodb.net/healthcare_map?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority",
//   // Optional if you have other options in mind
//   // https://mongodb.github.io/node-mongodb-native/3.6/api/MongoClient.html#.connect
//   options: {
//     tls: true,
//     tlsCertificateKeyFile: credentials,
//     authMechanism: "MONGODB-X509",
//     serverApi: ServerApiVersion.v1,
//   },
// });

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
  .use(cors())
  .use(DiseasesController)
  .use(UsersController)
  .use(HospitalsController)
  .onStop(() => client.close())
  .listen(8080);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
