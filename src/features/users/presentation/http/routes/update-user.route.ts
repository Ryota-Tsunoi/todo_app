import { createRoute } from "@hono/zod-openapi";
import {
  v1UpdateUserPathParamsSchema,
  v1UpdateUserRequestSchema,
} from "../request/update-user.request";
import { v1UpdateUserResponseSchema } from "../response/update-user.response";

export const v1UpdateUserRoute = createRoute({
  method: "put",
  path: "/users/{id}",
  request: {
    params: v1UpdateUserPathParamsSchema,
    body: {
      description: "The user to update",
      content: {
        "application/json": {
          schema: v1UpdateUserRequestSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "The updated user",
      content: {
        "application/json": {
          schema: v1UpdateUserResponseSchema,
        },
      },
    },
  },
  tags: ["Users"],
});
