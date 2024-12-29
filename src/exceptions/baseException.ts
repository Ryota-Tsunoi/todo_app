import { ErrorCodeType } from "./errorCodes";

/**
 * @description 基本となる例外クラス
 * すべてのカスタム例外クラスはこのクラスを継承します
 */
export class BaseException extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number,
    public readonly errorCode: ErrorCodeType,
    public readonly errors?: unknown[],
    public readonly cause?: unknown,
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * @description エラーレスポンスの型定義
 */
export type ErrorResponse = {
  statusCode: number;
  message: string;
  errorCode: ErrorCodeType;
  timestamp: string;
  path?: string;
  errors?: unknown[];
  cause?: unknown;
  stack?: string;
};
