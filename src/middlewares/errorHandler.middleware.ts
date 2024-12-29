import { Context } from "hono";
import { ContentfulStatusCode } from "hono/utils/http-status";
import { BaseException, ErrorResponse } from "../exceptions/baseException";
import { ErrorCode } from "../exceptions/errorCodes";

/**
 * @description エラーハンドラーミドルウェア
 * アプリケーション全体のエラーハンドリングを行います
 */
export const errorHandler = async (err: Error, c: Context) => {
  console.error("[Error]", err);

  const isProd = process.env.NODE_ENV === "production";
  const response: ErrorResponse = {
    statusCode: 500,
    message: "Internal Server Error",
    errorCode: ErrorCode.INTERNAL_ERROR,
    timestamp: new Date().toISOString(),
    path: c.req.path,
  };

  if (err instanceof BaseException) {
    response.statusCode = err.statusCode;
    response.errorCode = err.errorCode;
    response.message = err.message;
    if (err.errors) {
      response.errors = err.errors;
    }
    if (err.cause) {
      response.cause = err.cause;
    }
  }

  if (!isProd) {
    response.stack = err.stack;
  }

  return c.json(response, response.statusCode as ContentfulStatusCode);
};
