import { t } from "elysia";

// const DiseaseSchema = {
//   name: t.String(),
//   description: t.Optional(t.String()),
//   scientific_name: t.String(),
//   classification: t.String(),
//   severity: t.String(),
// };

// const CreatedAt = {
//   created_at: t.Optional(t.Date()),
// };

// const UpdatedAt = {
//   updated_at: t.Optional(t.Date()),
// };

// export const CreateDiseaseDTO = t.Object({
//   ...DiseaseSchema,
//   ...CreatedAt,
//   ...UpdatedAt,
// });

// export const UpdateDiseaseDTO = t.Object({ ...DiseaseSchema, ...UpdatedAt });

export const CreateDiseaseDTO = t.Object({
  name: t.String(),
  description: t.Optional(t.String()),
  scientific_name: t.String(),
  classification: t.String(),
  severity: t.String(),
});

export const UpdateDiseaseDTO = t.Object({
  name: t.Optional(t.String()),
  description: t.Optional(t.String()),
  scientific_name: t.Optional(t.String()),
  classification: t.Optional(t.String()),
  severity: t.Optional(t.String()),
});
