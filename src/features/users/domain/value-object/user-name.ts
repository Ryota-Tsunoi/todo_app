import { ValueObject } from "../../../../common/domain/value-object";
import { InvalidUserNameError } from "../error/domain-error";

/**
 * @description ユーザー名のValue Object
 * ユーザー名のバリデーションと不変性を保証します
 */
export class UserName extends ValueObject<string> {
  private static readonly MIN_LENGTH = 1;
  private static readonly MAX_LENGTH = 20;

  protected validate(value: string): void {
    if (
      value.length < UserName.MIN_LENGTH ||
      value.length > UserName.MAX_LENGTH
    ) {
      throw new InvalidUserNameError(
        value,
        UserName.MIN_LENGTH,
        UserName.MAX_LENGTH,
      );
    }
  }
}
