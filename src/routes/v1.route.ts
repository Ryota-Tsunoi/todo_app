import { swaggerUI } from "@hono/swagger-ui";
import { App } from "../app";
import {
  v1FetchUser,
  v1FetchUserRoute,
  v1ListUsers,
  v1ListUsersRoute,
  v1UpdateUser,
  v1UpdateUserRoute,
} from "../features/users/presentation";
import { v1RootGet, v1RootGetRoute } from "./v1";

export const v1App = async (app: App) => {
  const v1Router = app.basePath("/v1");

  // Features Routes
  v1Router.openapi(v1RootGetRoute, v1RootGet);
  v1Router
    .openapi(v1ListUsersRoute, v1ListUsers)
    .openapi(v1FetchUserRoute, v1FetchUser)
    .openapi(v1UpdateUserRoute, v1UpdateUser);

  // OpenAPI Documentation
  const openApiSpec = {
    openapi: "3.0.0",
    info: {
      version: "0.0.1",
      title: "V1 Todo API",
    },
  };
  v1Router.doc("/specifications", openApiSpec).get(
    "/docs",
    swaggerUI({
      url: "/api/v1/specifications",
    }),
  );
};
