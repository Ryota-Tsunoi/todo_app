import { ValueObject } from "../../../../common/domain/value-object";
import { InvalidUserIdError } from "../error/domain-error";

export class UserId extends ValueObject<string> {
  protected validate(value: string): void {
    const nanoIdPattern = /^[A-Za-z0-9_-]{21}$/;
    if (!nanoIdPattern.test(value)) {
      throw new InvalidUserIdError(value);
    }
  }
}
