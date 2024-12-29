import { ErrorCode } from "../../../exceptions/errorCodes";
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from "../../../exceptions/httpException";
import { User } from "../domain/entity/user";
import {
  DomainError,
  UserFetchError,
  UserNotFoundError,
  UserUpdateError,
} from "../domain/error/domain-error";
import { UserRepository } from "../domain/repository/user.repository";
import { UserName } from "../domain/value-object/user-name";
import { UserMapper } from "../infrastructure/mapper/user.mapper";

/**
 * @description ユーザー関連のユースケースを実装するクラス
 */
export class UserInteractor {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly mapper: UserMapper,
  ) {}

  /**
   * ユーザー一覧を取得
   */
  async fetchListUsers(): Promise<User[]> {
    try {
      const users = await this.userRepository.getMany();
      return users.map((user) => this.mapper.toEntity(user));
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * 指定されたIDのユーザーを取得
   */
  async fetchUser(id: string): Promise<User> {
    try {
      const user = await this.userRepository.getOne(id);
      return this.mapper.toEntity(user);
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * ユーザー情報を更新
   */
  async updateUser(id: string, name: string): Promise<User> {
    try {
      // 新しい名前でUserNameを作成（バリデーション）
      const userName = new UserName(name);

      // 現在のユーザーを取得
      const currentUser = await this.userRepository.getOne(id);
      const userEntity = this.mapper.toEntity(currentUser);

      // 名前を更新した新しいエンティティを作成
      const updatedEntity = userEntity.changeName(userName);

      // リポジトリで更新を実行
      const updatedDto = await this.userRepository.update(
        this.mapper.toDto(updatedEntity),
      );

      return this.mapper.toEntity(updatedDto);
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * エラーを適切なHTTP例外に変換
   */
  private handleError(error: unknown): never {
    if (error instanceof UserNotFoundError) {
      throw new NotFoundException(error.message, ErrorCode.USER_NOT_FOUND);
    }
    if (error instanceof UserUpdateError) {
      throw new InternalServerErrorException(
        error.message,
        ErrorCode.USER_UPDATE_FAILED,
        error.cause ? [error.cause] : undefined,
      );
    }
    if (error instanceof UserFetchError) {
      throw new InternalServerErrorException(
        error.message,
        ErrorCode.INTERNAL_ERROR,
        error.cause ? [error.cause] : undefined,
      );
    }
    if (error instanceof DomainError) {
      throw new BadRequestException(
        error.message,
        ErrorCode.USER_UPDATE_VALIDATION_FAILED,
      );
    }
    throw new InternalServerErrorException(
      "An unexpected error occurred",
      ErrorCode.INTERNAL_ERROR,
      error instanceof Error ? [error] : undefined,
    );
  }
}
