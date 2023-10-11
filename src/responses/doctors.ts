import { doctors, specialities, users } from "@prisma/client";
import { GalleryResponse } from "./subresponses";

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

export type DoctorResponse = Omit<
  doctors,
  "user_id" | "work_history" | "speciality_id"
> & {
  speciality: specialities;
  //   id: string;
  //   npi: string | null;
  user_info: Omit<users, "password">;
  //   user_info: any;
  //   speciality: any;
  //   gallery: GalleryResponse[];
  //   biography: string | null;
  work_history: WorkHistoryResponse[];
  //   certificates: CertificateInfoResponse[];
  //   created_at: Date;
  //   updated_at: Date;
};
