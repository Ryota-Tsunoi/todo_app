import { User } from "../../domain/entity/user";
import {
  UserFetchError,
  UserNotFoundError,
  UserUpdateError,
} from "../../domain/error/domain-error";
import { UserRepository } from "../../domain/repository/user.repository";
import { UserDto } from "../dto/user.dto";
import { UserMapper } from "../mapper/user.mapper";

/**
 * @description ユーザーリポジトリの実装
 * インメモリでのユーザー管理を行います
 */
export class UserRepositoryImpl implements UserRepository {
  constructor(protected readonly mapper: UserMapper) {}

  protected users: User[] = [];

  async getMany(): Promise<UserDto[]> {
    try {
      return this.users.map((user) => this.mapper.toDto(user));
    } catch (error: unknown) {
      throw new UserFetchError(
        "Failed to fetch users",
        error instanceof Error ? error : new Error("Unknown error"),
      );
    }
  }

  async getOne(id: string): Promise<UserDto> {
    try {
      const user = this.users.find((user) => user.id.value === id);
      if (!user) {
        throw new UserNotFoundError(id);
      }
      return this.mapper.toDto(user);
    } catch (error: unknown) {
      if (error instanceof UserNotFoundError) {
        throw error;
      }
      throw new UserFetchError(
        `Failed to fetch user: ${id}`,
        error instanceof Error ? error : new Error("Unknown error"),
      );
    }
  }

  async update(updateUser: UserDto): Promise<UserDto> {
    try {
      const index = this.users.findIndex(
        (user) => user.id.value === updateUser.id,
      );
      if (index === -1) {
        throw new UserNotFoundError(updateUser.id);
      }

      const user = this.mapper.toEntity(updateUser);
      this.users[index] = user;
      return this.mapper.toDto(user);
    } catch (error: unknown) {
      if (error instanceof UserNotFoundError) {
        throw error;
      }
      throw new UserUpdateError(
        updateUser.id,
        error instanceof Error ? error : new Error("Unknown error"),
      );
    }
  }
}
