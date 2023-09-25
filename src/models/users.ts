import { t } from "elysia";
import { emailValidation } from "../regex";

const UserInfo = {
  first_name: t.String(),
  last_name: t.String(),
  gender: t.String(),
  dob: t.String(),
  home_address: t.String(),
  avatar: t.Optional(t.String()),
};

export const CreateUserDTO = t.Object({
  username: t.String(),
  email: t.String({
    pattern: emailValidation,
    default: "dpcongdanh@gmail.com",
  }),
  password: t.String(),
  phone: t.String(),
  info: t.Object(UserInfo),
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
  info: t.Optional(t.Object(UserInfo)),
});
