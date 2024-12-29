import { UserId } from "../value-object/user-id";
import { UserName } from "../value-object/user-name";

/**
 * @description ユーザーエンティティ
 * ユーザードメインの中心的なエンティティ
 */
export class User {
  constructor(
    readonly id: UserId,
    readonly name: UserName,
  ) {}

  /**
   * ユーザー名を変更する
   * @param name 新しいユーザー名
   */
  changeName(name: UserName): User {
    return new User(this.id, name);
  }
}
