import { t } from "elysia";
import { emailValidation } from "../regex";

const UserInfo = {
  first_name: t.String(),
  last_name: t.String(),
  gender: t.String(),
  dob: t.Any(),
  home_address: t.String(),
  avatar: t.Optional(t.String()),
};

const UserSchema = {
  username: t.String(),
  email: t.String({
    pattern: emailValidation,
    default: "dpcongdanh@gmail.com",
  }),
  password: t.String(),
  phone: t.String(),
  info: t.Object(UserInfo),
};

const CreatedAt = {
  created_at: t.Optional(t.Date()),
};

const UpdatedAt = {
  updated_at: t.Optional(t.Date()),
};

export const CreateUserDTO = t.Object({
  ...UserSchema,
  ...CreatedAt,
  ...UpdatedAt,
});

export const UpdateUserDTO = t.Object({ ...UserSchema, ...UpdatedAt });
