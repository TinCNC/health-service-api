import { t } from "elysia";

export const Gallery = {
  id: t.Optional(t.Any()),
  name: t.String(),
  description: t.Optional(t.String()),
  file: t.String(),
  created_at: t.Optional(t.Date()),
  updated_at: t.Optional(t.Date()),
};

export type GalleryResponse = {
  id: string | null;
  name: string | null;
  description?: string | null;
  file: string | null;
  created_at: Date;
  updated_at: Date;
};
