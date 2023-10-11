import { t } from "elysia";

export const CreateSpecialityDTO = t.Object({
  name: t.String(),
  description: t.Optional(t.String()),
});

export const UpdateSpecialityDTO = t.Object({
  name: t.Optional(t.String()),
  description: t.Optional(t.String()),
});
