import { createRoute, z } from "@hono/zod-openapi";
import { AppRouteHandler } from "../../types/route-handler";

export const v1RootGetResponseSchema = z.object({
  version: z.string().openapi({
    example: "1.0.0",
  }),
  message: z.string().openapi({
    example: "Hello Hono!",
  }),
  description: z.string().openapi({
    example: "This is the V1 API for the Hono server.",
  }),
  uptime: z.number().openapi({
    example: 100,
  }),
});

type V1RootGetResponse = z.infer<typeof v1RootGetResponseSchema>;

export const v1RootGetRoute = createRoute({
  method: "get",
  summary: "v1 root route",
  description: "v1 root router return Hello Hono",
  path: "/",
  request: {},
  responses: {
    200: {
      content: {
        "application/json": {
          schema: v1RootGetResponseSchema,
        },
      },
      description: "v1 root router return Hello Hono",
    },
  },
  tags: ["Root"],
});

export const v1RootGet: AppRouteHandler<typeof v1RootGetRoute> = (c) => {
  const response: V1RootGetResponse = {
    version: "1.0.0",
    message: "Hello v1 Health API",
    description: "This is the V1 API for the Hono server.",
    uptime: process.uptime(),
  };
  return c.json(response);
};
