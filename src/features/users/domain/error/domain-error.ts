/**
 * @description ドメイン層のベースエラー
 * ユーザードメインで使用する基本エラークラス
 */
export abstract class DomainError extends Error {
  constructor(
    message: string,
    public readonly cause?: unknown,
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

/**
 * @description ユーザーIDのバリデーションエラー
 */
export class InvalidUserIdError extends DomainError {
  constructor(id: string) {
    super(`Invalid user ID format: ${id}`);
  }
}

/**
 * @description ユーザー名のバリデーションエラー
 */
export class InvalidUserNameError extends DomainError {
  constructor(name: string, minLength: number, maxLength: number) {
    super(
      `Invalid user name: ${name}. Length must be between ${minLength} and ${maxLength}`,
    );
  }
}

/**
 * @description ユーザーが見つからない場合のエラー
 */
export class UserNotFoundError extends DomainError {
  constructor(id: string) {
    super(`User not found: ${id}`);
  }
}

/**
 * @description ユーザー更新失敗エラー
 */
export class UserUpdateError extends DomainError {
  constructor(id: string, cause?: unknown) {
    super(`Failed to update user: ${id}`, cause);
  }
}

/**
 * @description ユーザー取得失敗エラー
 */
export class UserFetchError extends DomainError {
  constructor(message: string, cause?: unknown) {
    super(`Failed to fetch user: ${message}`, cause);
  }
}
