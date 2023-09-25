import { t } from "elysia";

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
