import { z } from "@hono/zod-openapi";

export const v1FetchUserPathParamsSchema = z
  .object({
    id: z.string().openapi({
      example: "123e4567-e89b-12d3-a456-426614174000",
    }),
  })
  .openapi("FetchUserRequestParams");

export type V1FetchUserPathParams = z.infer<typeof v1FetchUserPathParamsSchema>;
