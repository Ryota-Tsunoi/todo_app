import { UserDto } from "../../infrastructure/dto/user.dto";

/**
 * @description ユーザーリポジトリのインターフェース
 * ドメイン層で定義し、インフラ層で実装します
 */
export interface UserRepository {
  /**
   * すべてのユーザーを取得
   * @throws {UserFetchError} ユーザー取得に失敗した場合
   */
  getMany(): Promise<UserDto[]>;

  /**
   * 指定されたIDのユーザーを取得
   * @param id ユーザーID
   * @throws {UserNotFoundError} ユーザーが見つからない場合
   * @throws {UserFetchError} ユーザー取得に失敗した場合
   */
  getOne(id: string): Promise<UserDto>;

  /**
   * ユーザー情報を更新
   * @param user 更新するユーザー情報
   * @throws {UserNotFoundError} ユーザーが見つからない場合
   * @throws {UserUpdateError} ユーザー更新に失敗した場合
   */
  update(user: UserDto): Promise<UserDto>;
}
