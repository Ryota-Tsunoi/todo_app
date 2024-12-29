import { z } from "@hono/zod-openapi";

export const v1ListUsersRequestSchema = z
  .object({})
  .openapi("ListUsersRequest");

export type V1ListUsersRequest = z.infer<typeof v1ListUsersRequestSchema>;
