import { addLinks } from "@bluelibs/nova";
import { db } from "./db";

export const diseases = db.collection("diseases");
export const hospitals = db.collection("hospitals");
export const doctors = db.collection("doctors");
export const patients = db.collection("patients");
export const users = db.collection("users");
export const chats = db.collection("chats");

addLinks(hospitals, {
  director_info: {
    collection: () => users,
    field: "director",
  },
});

addLinks(doctors, {
  user_ref: {
    collection: () => users,
    field: "user_id",
    unique: true,
  },
});

addLinks(patients, {
  user_ref: {
    collection: () => users,
    field: "user_id",
    unique: true,
  },
});
