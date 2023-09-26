import { t } from "elysia";

const Prescription = {
  id: t.Optional(t.Any()),
  medicine: t.Any(),
  quantity: t.Integer(),
  notes: t.String(),
  created_at: t.Optional(t.Date()),
  updated_at: t.Optional(t.Date()),
};

const DiseaseHistory = {
  id: t.Optional(t.Any()),
  name: t.String(),
  diseases: t.Any(),
  description: t.String(),
  examiner: t.Any(),
  prescriptions: t.Array(t.Object(Prescription)),
  examined_at: t.Date(),
  reexamine_at: t.Optional(t.Date()),
  created_at: t.Optional(t.Date()),
  updated_at: t.Optional(t.Date()),
};

export const CreatePatientDTO = t.Object({
  user_id: t.Any(),
  diseases_history: t.Optional(t.Array(t.Object(DiseaseHistory))),
});

export const UpdatePatientDTO = t.Object({
  user_id: t.Optional(t.Any()),
  diseases_history: t.Optional(t.Array(t.Object(DiseaseHistory))),
});
