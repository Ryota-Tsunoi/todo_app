import { OpenAPIHono as Hono } from "@hono/zod-openapi";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";
import { requestId } from "hono/request-id";
import { trimTrailingSlash } from "hono/trailing-slash";
import { NotFoundException } from "./exceptions/httpException";
import { initializeInteractors } from "./injections/interactors.initialize";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { customLogger } from "./middlewares/logger.middleware";
import { HonoEnv } from "./types/hono-env";

export const initializedApp = () => {
  const app = new Hono<HonoEnv>();

  const apiRouter = app.basePath("/api");

  apiRouter.use(
    cors({
      origin: "*",
      allowHeaders: ["Content-Type", "Authorization", "x-api-key"],
      allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    }),
  );

  apiRouter.use("*", async (c, next) => {
    const interactors = initializeInteractors();
    c.set("interactors", interactors);
    await next();
  });

  apiRouter.use(requestId());

  apiRouter.use(prettyJSON());

  apiRouter.use(trimTrailingSlash());

  apiRouter.use(customLogger);

  apiRouter.notFound(() => {
    throw new NotFoundException();
  });

  apiRouter.onError(errorHandler);

  return apiRouter;
};

export type App = ReturnType<typeof initializedApp>;
