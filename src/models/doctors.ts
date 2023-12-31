import { t } from "elysia";

const Gallery = {
  name: t.String(),
  description: t.Optional(t.String()),
  file: t.String(),
};

const CertificateInfo = {
  issuer: t.String(),
  validator: t.String(),
  program: t.String(),
  type: t.String(),
  image: t.String(),
  level: t.Integer(),
  issued_date: t.Any(),
  expired_date: t.Any(),
};

const WorkHistory = {
  hospital: t.Any(),
  salary: t.Number(),
  start_date: t.Any(),
  end_date: t.Any(),
};

const DoctorSchema = {
  npi: t.String(),
  user_id: t.Any(),
  speciality: t.String(),
  gallery: t.Array(t.Object(Gallery)),
  biography: t.String(),
  work_history: t.Array(t.Object(WorkHistory)),
  certificates: t.Array(t.Object(CertificateInfo)),
};

const CreatedAt = {
  created_at: t.Optional(t.Date()),
};

const UpdatedAt = {
  updated_at: t.Optional(t.Date()),
};

export const CreateDoctorDTO = t.Object({
  ...DoctorSchema,
  ...CreatedAt,
  ...UpdatedAt,
});

export const UpdateDoctorDTO = t.Object({ ...DoctorSchema, ...UpdatedAt });
