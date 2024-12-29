import { z } from "@hono/zod-openapi";

export const v1UpdateUserPathParamsSchema = z
  .object({
    id: z.string().openapi({
      example: "123e4567-e89b-12d3-a456-426614174000",
    }),
  })
  .openapi("UpdateUserPathParams");

export const v1UpdateUserRequestSchema = z
  .object({
    name: z.string().min(1).max(20).openapi({
      example: "John Doe",
    }),
  })
  .openapi("UpdateUserRequestBody");

export type V1UpdateUserPathParams = z.infer<
  typeof v1UpdateUserPathParamsSchema
>;
export type V1UpdateUserRequestBody = z.infer<typeof v1UpdateUserRequestSchema>;
