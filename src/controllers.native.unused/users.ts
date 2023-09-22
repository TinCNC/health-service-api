import { Elysia } from "elysia";
import { ObjectId } from "mongodb";
import { CreateUserDTO, UpdateUserDTO } from "../models";
import { users } from "../collections";

export const UsersController = new Elysia()
  .get("/users", async () => users.find().toArray())
  .get("/users/:id", ({ params: { id } }) =>
    users.findOne({ _id: new ObjectId(id) })
  )
  .post(
    "/users",
    async ({ body }) => {
      users.createIndex({ username: 1 }, { unique: true });
      users.createIndex({ email: 1 }, { unique: true });
      users.createIndex({ phone: 1 }, { unique: true });
      body.created_at = new Date();
      body.updated_at = new Date();
      body.info.dob = new Date(body.info.dob);
      body.password = await Bun.password.hash(body.password);
      return users.insertOne(body);
    },
    {
      body: CreateUserDTO,
    }
  )
  .patch(
    "/users/:id",
    async ({ params: { id }, body }) => {
      body.updated_at = new Date();
      body.info.dob = new Date(body.info.dob);
      body.password = await Bun.password.hash(body.password);
      users.updateOne({ _id: new ObjectId(id) }, { $set: body });
      return body;
    },
    {
      body: UpdateUserDTO,
    }
  )
  .delete("/users/:id", ({ params: { id } }) => {
    return users.findOneAndDelete({ _id: new ObjectId(id) });
  });
