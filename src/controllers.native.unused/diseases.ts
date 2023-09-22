import { Elysia } from "elysia";
import { ObjectId } from "mongodb";
import { CreateDiseaseDTO, UpdateDiseaseDTO } from "../models";
import { diseases } from "../collections";

export const DiseasesController = new Elysia()
  .get("/diseases", () => diseases.find().toArray())
  .get("/diseases/:id", ({ params: { id } }) =>
    diseases.findOne({ _id: new ObjectId(id) })
  )
  .post(
    "/diseases",
    ({ body }) => {
      body.created_at = new Date();
      body.updated_at = new Date();
      diseases.createIndex({ name: 1 }, { unique: true });
      diseases.createIndex({ description: "text" });
      return diseases.insertOne(body);
    },
    {
      body: CreateDiseaseDTO,
    }
  )
  .patch(
    "/diseases/:id",
    ({ params: { id }, body }) => {
      body.updated_at = new Date();
      diseases.updateOne({ _id: new ObjectId(id) }, { $set: body });
      return body;
    },
    {
      body: UpdateDiseaseDTO,
    }
  )
  .delete("/diseases/:id", ({ params: { id } }) => {
    return diseases.findOneAndDelete({ _id: new ObjectId(id) });
  });
