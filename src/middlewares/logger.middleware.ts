import { Context, Next } from "hono";

export const customLogger = async (c: Context, next: Next) => {
  const accessLog = {
    requestId: c.get("requestId"),
    headers: c.req.header(),
    query: c.req.query(),
    body: ["POST", "PUT", "PATCH"].includes(c.req.method)
      ? await c.req.json().catch(() => ({}))
      : {},
  };
  const logTitle = `[ACCESS LOG] [${c.req.method} ${c.req.url}]`;
  console.log(logTitle, accessLog);
  await next();
};
