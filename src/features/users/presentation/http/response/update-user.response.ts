import { z } from "@hono/zod-openapi";

export const v1UpdateUserResponseSchema = z
  .object({
    user: z.object({
      id: z.string().openapi({
        example: "123e4567-e89b-12d3-a456-426614174000",
      }),
      name: z.string().openapi({
        example: "John Doe",
      }),
    }),
  })
  .openapi("UpdateUserResponse");

export type V1UpdateUserResponse = z.infer<typeof v1UpdateUserResponseSchema>;
