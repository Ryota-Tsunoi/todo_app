import { RouteConfig, RouteHandler } from "@hono/zod-openapi";
import { HonoEnv } from "./hono-env";

export type AppRouteHandler<T extends RouteConfig> = RouteHandler<T, HonoEnv>;
