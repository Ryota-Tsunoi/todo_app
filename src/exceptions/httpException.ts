import { BaseException } from "./baseException";
import { ErrorCode, ErrorCodeType } from "./errorCodes";

/**
 * @description 400 Bad Request
 */
export class BadRequestException extends BaseException {
  constructor(
    message = "Bad Request",
    errorCode: ErrorCodeType = ErrorCode.INVALID_REQUEST,
    errors?: unknown[],
    cause?: unknown,
  ) {
    super(message, 400, errorCode, errors, cause);
  }
}

/**
 * @description 401 Unauthorized
 */
export class UnauthorizedException extends BaseException {
  constructor(
    message = "Unauthorized",
    errorCode: ErrorCodeType = ErrorCode.UNKNOWN_ERROR,
    errors?: unknown[],
    cause?: unknown,
  ) {
    super(message, 401, errorCode, errors, cause);
  }
}

/**
 * @description 403 Forbidden
 */
export class ForbiddenException extends BaseException {
  constructor(
    message = "Forbidden",
    errorCode: ErrorCodeType = ErrorCode.UNKNOWN_ERROR,
    errors?: unknown[],
    cause?: unknown,
  ) {
    super(message, 403, errorCode, errors, cause);
  }
}

/**
 * @description 404 Not Found
 */
export class NotFoundException extends BaseException {
  constructor(
    message = "Not Found",
    errorCode: ErrorCodeType = ErrorCode.UNKNOWN_ERROR,
    errors?: unknown[],
    cause?: unknown,
  ) {
    super(message, 404, errorCode, errors, cause);
  }
}

/**
 * @description 409 Conflict
 */
export class ConflictException extends BaseException {
  constructor(
    message = "Conflict",
    errorCode: ErrorCodeType = ErrorCode.UNKNOWN_ERROR,
    errors?: unknown[],
    cause?: unknown,
  ) {
    super(message, 409, errorCode, errors, cause);
  }
}

/**
 * @description 429 Too Many Requests
 */
export class TooManyRequestsException extends BaseException {
  constructor(
    message = "Too Many Requests",
    errorCode: ErrorCodeType = ErrorCode.UNKNOWN_ERROR,
    errors?: unknown[],
    cause?: unknown,
  ) {
    super(message, 429, errorCode, errors, cause);
  }
}

/**
 * @description 500 Internal Server Error
 */
export class InternalServerErrorException extends BaseException {
  constructor(
    message = "Internal Server Error",
    errorCode: ErrorCodeType = ErrorCode.INTERNAL_ERROR,
    errors?: unknown[],
    cause?: unknown,
  ) {
    super(message, 500, errorCode, errors, cause);
  }
}
