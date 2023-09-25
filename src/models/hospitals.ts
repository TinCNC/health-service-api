import { t } from "elysia";
import { Gallery } from "./submodels/gallery";
import { emailValidation } from "../regex";

const ContactInfo = {
  website: t.Optional(t.String()),
  phone: t.Optional(t.String({ minLength: 10, maxLength: 12 })),
  email: t.Optional(
    t.String({ pattern: emailValidation, default: "dpcongdanh@gmail.com" })
  ),
  address: t.Optional(t.String()),
};

const Location = {
  type: t.String({ default: "Point", examples: "Point" }),
  coordinates: t.Array(t.Number(), { minItems: 2, maxItems: 2 }),
};

export const CreateHospitalDTO = t.Object({
  name: t.String(),
  location: t.Object(Location),
  director: t.Any(),
  gallery: t.Optional(t.Array(t.Object(Gallery))),
  capacity: t.Integer({ minimum: 1 }),
  contact_info: t.Optional(t.Object(ContactInfo)),
});

export const UpdateHospitalDTO = t.Object({
  name: t.Optional(t.String()),
  location: t.Optional(t.Object(Location)),
  director: t.Optional(t.Any()),
  gallery: t.Optional(t.Array(t.Object(Gallery))),
  capacity: t.Optional(t.Integer({ minimum: 1 })),
  contact_info: t.Optional(t.Object(ContactInfo)),
});
