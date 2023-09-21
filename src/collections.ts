import { addLinks } from "@bluelibs/nova";
import { db } from "./db";

export const diseases = db.collection("diseases");
export const hospitals = db.collection("hospitals");
export const users = db.collection("users");

addLinks(hospitals, {
  director_info: {
    collection: () => users,
    field: "director",
  },
});
