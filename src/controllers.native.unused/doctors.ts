import { Elysia } from "elysia";
import { ObjectId } from "mongodb";
import { CreateDoctorDTO, UpdateDoctorDTO } from "../models";
import { doctors, users } from "../collections";
import { query } from "@bluelibs/nova";

export const DoctorsController = new Elysia()
  //   .get("/doctors", async () => doctors.find().toArray())
  .get(
    "/doctors",
    async () =>
      await query(doctors, {
        npi: 1,
        user_id: 1,
        speciality: 1,
        gallery: 1,
        biography: 1,
        work_history: 1,
        certificates: 1,
        user_ref: {
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
  // .get("/doctors/:id", ({ params: { id } }) =>
  //   doctors.findOne({ _id: new ObjectId(id) })
  // )
  .get(
    "/doctors/:id",
    async ({ params: { id } }) =>
      await query(doctors, {
        $: {
          // MongoDB Filters
          filters: {
            _id: new ObjectId(id),
          },

          // MongoDB Options
          options: {
            limit: 100,
            skip: 0,
          },
        },
        npi: 1,
        user_id: 1,
        speciality: 1,
        gallery: 1,
        biography: 1,
        work_history: 1,
        certificates: 1,
        user_ref: {
          phone: 1,
          info: {
            first_name: 1,
            last_name: 1,
            gender: 1,
          },
        },
        created_at: 1,
        updated_at: 1,
      }).fetchOne()
  )
  .post(
    "/doctors",
    async ({ body }) => {
      doctors.createIndex({ npi: 1 }, { unique: true });
      doctors.createIndex({ user_id: 1 }, { unique: true });
      doctors.createIndex({ biography: "text" });

      body.user_id = new ObjectId(body.user_id);
      // const isFound = await users.findOne(body.user_id);
      body.created_at = new Date();
      body.updated_at = new Date();
      return doctors.insertOne(body);
    },
    {
      body: CreateDoctorDTO,
    }
  )
  .patch(
    "/doctors/:id",
    async ({ params: { id }, body }) => {
      body.updated_at = new Date();
      return doctors.insertOne(body);
    },
    {
      body: UpdateDoctorDTO,
    }
  )
  .delete("/doctors/:id", ({ params: { id } }) => {
    return doctors.findOneAndDelete({ _id: new ObjectId(id) });
  });
