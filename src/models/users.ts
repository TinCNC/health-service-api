import { t } from "elysia";
import { emailValidation } from "../regex";

const Notification = t.Object({
  id: t.Optional(t.String()),
  title: t.String(),
  message: t.String(),
  type: t.String(),
  created_at: t.Optional(t.Date()),
});

const Appointment = t.Object({
  id: t.Optional(t.String()),
  user_id: t.String(),
  begin_at: t.String() || t.Date(),
  end_at: t.String() || t.Date(),
});

const UserInfo = t.Object({
  first_name: t.String(),
  last_name: t.String(),
  gender: t.String(),
  dob: t.String() || t.Date(),
  home_address: t.String(),
  avatar: t.Optional(t.String()),
});

export const CreateUserDTO = t.Object({
  username: t.String(),
  email: t.String({
    pattern: emailValidation,
    default: "dpcongdanh@gmail.com",
  }),
  password: t.String(),
  phone: t.String(),
  appointments: t.Optional(t.Array(Appointment)),
  notifications: t.Optional(t.Array(Notification)),
  info: UserInfo,
});

export const SigninDTO = t.Object({
  username: t.String(),
  password: t.String(),
});

export const UpdateUserDTO = t.Object({
  username: t.Optional(t.String()),
  email: t.Optional(
    t.String({
      pattern: emailValidation,
      default: "dpcongdanh@gmail.com",
    })
  ),
  password: t.Optional(t.String()),
  phone: t.Optional(t.String()),
  info: t.Optional(UserInfo),
});
