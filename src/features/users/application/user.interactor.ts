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
import { UserId } from "../domain/value-object/user-id";
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
   * エラーを適切なHTTP例外に変換します
   * @param error 発生したエラー
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

  async fetchListUsers(): Promise<User[]> {
    try {
      const users = await this.userRepository.getMany();
      return users.map((user) => this.mapper.toEntity(user));
    } catch (error: unknown) {
      this.handleError(error);
    }
  }

  async fetchUser(id: string): Promise<User> {
    try {
      const userId = new UserId(id);
      const user = await this.userRepository.getOne(userId.value);
      return this.mapper.toEntity(user);
    } catch (error: unknown) {
      this.handleError(error);
    }
  }

  async updateUser(id: string, name: string): Promise<User> {
    try {
      const userId = new UserId(id);
      const userName = new UserName(name);

      const userDto = await this.userRepository.getOne(userId.value);
      const user = this.mapper.toEntity(userDto);
      const updatedUser = user.changeName(userName);

      const updatedUserDto = this.mapper.toDto(updatedUser);
      const savedDto = await this.userRepository.update(updatedUserDto);

      return this.mapper.toEntity(savedDto);
    } catch (error: unknown) {
      this.handleError(error);
    }
  }
}
