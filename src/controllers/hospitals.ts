import { Elysia } from "elysia";
import { ObjectId } from "mongodb";
import { CreateHospitalDTO, UpdateHospitalDTO } from "../models";
import { hospitals, users } from "../collections";
import { query } from "@bluelibs/nova";

export const HospitalsController = new Elysia()
  //   .get("/hospitals", () => hospitals.find().toArray())
  .get(
    "/hospitals",
    async () =>
      await query(hospitals, {
        name: 1,
        location: 1,
        // director: 1,
        capacity: 1,
        gallery: 1,
        contact_info: 1,
        director_info: {
          phone: 1,
          info: {
            first_name: 1,
            last_name: 1,
            gender: 1,
          },
        },
        created_at: 1,
        updated_at: 1,
      }).toArray()
  )
  .get("/hospitals/:id", ({ params: { id } }) =>
    hospitals.findOne({ _id: new ObjectId(id) })
  )
  .post(
    "/hospitals",
    ({ body }) => {
      body.director = new ObjectId(body.director);
      body.created_at = new Date();
      body.updated_at = new Date();
      hospitals.createIndex({ name: 1 }, { unique: true });
      hospitals.createIndex({ location: "2dsphere" }, { unique: true });
      return hospitals.insertOne(body);
    },
    {
      body: CreateHospitalDTO,
    }
  )
  .patch(
    "/hospitals/:id",
    ({ params: { id }, body }) => {
      body.director = new ObjectId(body.director);
      body.updated_at = new Date();
      hospitals.updateOne({ _id: new ObjectId(id) }, { $set: body });
      return body;
    },
    {
      body: UpdateHospitalDTO,
    }
  )
  .delete("/hospitals/:id", ({ params: { id } }) => {
    return hospitals.findOneAndDelete({ _id: new ObjectId(id) });
  });
