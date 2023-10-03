import { users } from "@prisma/client";

//   type Notification {
//     id         String?  @map("_id") @db.ObjectId
//     title      String
//     message    String
//     type       String
//     created_at DateTime @default(now())
//   }

// select: {
//   id: true,
//   email: true,
//   phone: true,
//   info: {
//     select: {
//       first_name: true,
//       last_name: true,
//     },
//   },
// },
// },

type AppointmentPersonInfo = {
  id: string;
  email: string;
  phone: string;
  info: {
    first_name: string;
    last_name: string;
  };
};

export type AppointmentResponse = {
  appointment_person?: string;
  person_to_meet?: string;
  appointment_person_info: AppointmentPersonInfo;
  person_to_meet_info: AppointmentPersonInfo;
  begin_at: Date;
  end_at: Date;
};

export type UserResponse = Omit<users, "appointments"> & {
  appointments: AppointmentResponse[];
};
