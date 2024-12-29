import { createRoute } from "@hono/zod-openapi";
import { v1FetchUserPathParamsSchema } from "../request/fetch-user.request";
import { v1FetchUserResponseSchema } from "../response/fetch-user.response";

export const v1FetchUserRoute = createRoute({
  method: "get",
  summary: "v1 fetch user route",
  description: "v1 fetch user router return user",
  path: "/users/{id}",
  request: {
    params: v1FetchUserPathParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: v1FetchUserResponseSchema,
        },
      },
      description: "v1 fetch user router return user",
    },
  },
  tags: ["Users"],
});
