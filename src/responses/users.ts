import { users } from "@prisma/client";

//   type Notification {
//     id         String?  @map("_id") @db.ObjectId
//     title      String
//     message    String
//     type       String
//     created_at DateTime @default(now())
//   }

export type AppointmentResponse = {
  id: string | null;
  user_id?: string;
  user_info: {
    id: string;
    info: {
      first_name: string;
      last_name: string;
    };
  } | null;
  begin_at: Date;
  end_at: Date;
};

export type UserResponse = Omit<users, "appointments" | "password"> & {
  //   password?: string;
  appointments: AppointmentResponse[];
};
