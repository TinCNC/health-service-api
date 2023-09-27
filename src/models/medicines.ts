import { t } from "elysia";

export const CreateMedicineDTO = t.Object({
  name: t.String(),
  brand: t.String(),
  description: t.Optional(t.String()),
  quantity: t.Integer(),
  price: t.Number(),
  hospital_id: t.Any(),
  image: t.Optional(t.String()),
});

export const UpdateMedicineDTO = t.Object({
  name: t.Optional(t.String()),
  brand: t.Optional(t.String()),
  description: t.Optional(t.String()),
  quantity: t.Optional(t.Integer()),
  price: t.Optional(t.Number()),
  hospital_id: t.Optional(t.Any()),
  image: t.Optional(t.String()),
});