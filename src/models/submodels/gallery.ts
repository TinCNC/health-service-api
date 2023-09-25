import { t } from "elysia";

export const Gallery = {
  id: t.Optional(t.Any()),
  name: t.String(),
  description: t.Optional(t.String()),
  file: t.String(),
  created_at: t.Optional(t.Date()),
  updated_at: t.Optional(t.Date()),
};
