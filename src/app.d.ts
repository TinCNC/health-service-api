/// <reference types="lucia" />

type UserInfo = {
  first_name: string;
  last_name: string;
  gender: string;
  dob: string | date;
  home_address: string;
  avatar?: string | undefined;
};

type Appointment = {
  // id?: string | undefined;
  person_to_meet: string;
  begin_at: string | Date;
  end_at: string | Date;
};

type PersonToMeet = {
  // id?: string | undefined;
  appointment_person: string;
  begin_at: string | Date;
  end_at: string | Date;
};

type Notification = {
  id?: string | undefined;
  title: string;
  message: string;
  type: string;
  created_at?: Date;
};
declare namespace Lucia {
  type Auth = import("./db.ts").Auth;
  type DatabaseUserAttributes = {
    username: string;
    email: string;
    phone: string;
    info: UserInfo;
    // appointments?: Appointment[] | undefined;
    // people_to_meet?: Appointment[] | undefined;
    notifications?: Notification[] | undefined;
  };
  type DatabaseSessionAttributes = {};
}
