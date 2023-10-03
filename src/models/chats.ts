import { t } from "elysia";

const ChatMetaData = t.Object({
  reaction: t.Optional(t.String()),
  deleted_sender_only: t.Boolean(),
  deleted_everyone: t.Boolean(),
  reply_to: t.Optional(t.Any()),
});

export const CreateChatDTO = t.Object({
  receiver: t.Any(),
  sender: t.Any(),
  message: t.String(),
  meta: t.Optional(ChatMetaData),
});

export const UpdateChatDTO = t.Object({
  receiver: t.Optional(t.Any()),
  sender: t.Optional(t.Any()),
  message: t.Optional(t.String()),
  meta: t.Optional(ChatMetaData),
});

export const ChatQuery = t.Object({
  message: t.Optional(t.String()),
});
