import { t } from "elysia";
import { emailValidation } from "../regex";

const Gallery = {
  name: t.String(),
  description: t.Optional(t.String()),
  file: t.String(),
};

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

const HospitalSchema = {
  name: t.String(),
  location: t.Object(Location),
  director: t.Any(),
  gallery: t.Array(t.Object(Gallery)),
  capacity: t.Integer({ minimum: 1 }),
  phone: t.String(),
  contact_info: t.Optional(t.Object(ContactInfo)),
};

const CreatedAt = {
  created_at: t.Optional(t.Date()),
};

const UpdatedAt = {
  updated_at: t.Optional(t.Date()),
};

export const CreateHospitalDTO = t.Object({
  ...HospitalSchema,
  ...CreatedAt,
  ...UpdatedAt,
});

export const UpdateHospitalDTO = t.Object({ ...HospitalSchema, ...UpdatedAt });
