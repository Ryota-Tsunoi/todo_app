import { createRoute } from "@hono/zod-openapi";
import { v1ListUsersRequestSchema } from "../request/list-users.request";
import { v1ListUsersResponseSchema } from "../response/list-users.response";

export const v1ListUsersRoute = createRoute({
  method: "get",
  summary: "v1 list users route",
  description: "v1 list users router return users",
  path: "/users",
  request: {
    params: v1ListUsersRequestSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: v1ListUsersResponseSchema,
        },
      },
      description: "v1 list users router return users",
    },
  },
  tags: ["Users"],
});
