import { t } from "elysia";
import { Gallery, GalleryResponse } from "./submodels/gallery";

const CertificateInfo = {
  id: t.Optional(t.Any()),
  issuer: t.String(),
  validator: t.String(),
  program: t.String(),
  type: t.String(),
  image: t.String(),
  level: t.Integer(),
  issued_date: t.Any(),
  expired_date: t.Any(),
  created_at: t.Optional(t.Date()),
  updated_at: t.Optional(t.Date()),
};

const WorkHistory = {
  id: t.Optional(t.Any()),
  hospital: t.Any(),
  salary: t.Number(),
  start_date: t.Any(),
  end_date: t.Any(),
  created_at: t.Optional(t.Date()),
  updated_at: t.Optional(t.Date()),
};

export const CreateDoctorDTO = t.Object({
  npi: t.String(),
  user_id: t.Any(),
  speciality: t.String(),
  gallery: t.Optional(t.Array(t.Object(Gallery))),
  biography: t.String(),
  work_history: t.Optional(t.Array(t.Object(WorkHistory))),
  certificates: t.Array(t.Object(CertificateInfo)),
});

export const UpdateDoctorDTO = t.Object({
  npi: t.Optional(t.String()),
  user_id: t.Optional(t.Any()),
  speciality: t.Optional(t.String()),
  gallery: t.Optional(t.Array(t.Object(Gallery))),
  biography: t.Optional(t.String()),
  work_history: t.Optional(t.Array(t.Object(WorkHistory))),
  certificates: t.Optional(t.Array(t.Object(CertificateInfo))),
});

export type CertificateInfoResponse = {
  id: string | null;
  issuer: string | null;
  validator: string | null;
  program: string | null;
  type: string | null;
  image: string | null;
  level: string | null;
  issued_date: Date;
  expired_date: Date | null;
  created_at: Date;
  updated_at: Date;
};

export type WorkHistoryResponse = {
  id: string | null;
  hospital?: any;
  salary: number;
  start_date: Date;
  end_date: Date | null;
  created_at: Date;
  updated_at: Date;
};

export type DoctorResponse = {
  id: string;
  npi: string | null;
  user_info: any;
  speciality: string | null;
  gallery: GalleryResponse[];
  biography: string | null;
  work_history: WorkHistoryResponse[];
  certificates: CertificateInfoResponse[];
  created_at: Date;
  updated_at: Date;
};
