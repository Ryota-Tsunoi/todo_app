import { nanoid } from "nanoid";
import { User } from "../../domain/entity/user";
import {
  DomainError,
  UserFetchError,
  UserNotFoundError,
  UserUpdateError,
} from "../../domain/error/domain-error";
import { UserRepository } from "../../domain/repository/user.repository";
import { UserId } from "../../domain/value-object/user-id";
import { UserName } from "../../domain/value-object/user-name";
import { UserDto } from "../dto/user.dto";
import { UserMapper } from "../mapper/user.mapper";

const users: User[] = [
  new User(new UserId(nanoid()), new UserName("John")),
  new User(new UserId(nanoid()), new UserName("Jane")),
  new User(new UserId(nanoid()), new UserName("Doe")),
];

/**
 * @description ユーザーリポジトリの実装
 * インメモリでのユーザー管理を行います
 */
export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly mapper: UserMapper) {}

  async getMany(): Promise<UserDto[]> {
    try {
      return users.map((user) => this.mapper.toDto(user));
    } catch (error: unknown) {
      if (error instanceof DomainError) {
        throw error;
      }
      throw new UserFetchError(
        "Failed to fetch users",
        error instanceof Error ? error : new Error("Unknown error"),
      );
    }
  }

  async getOne(id: string): Promise<UserDto> {
    try {
      const user = users.find((user) => user.id.value === id);
      if (!user) {
        throw new UserNotFoundError(id);
      }
      return this.mapper.toDto(user);
    } catch (error: unknown) {
      if (error instanceof DomainError) {
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
      const index = users.findIndex((user) => user.id.value === updateUser.id);
      if (index === -1) {
        throw new UserNotFoundError(updateUser.id);
      }

      if (Math.random() < 0.5) {
        throw new UserUpdateError(
          updateUser.id,
          new Error("Random update failure"),
        );
      }

      const user = this.mapper.toEntity(updateUser);
      users[index] = user;
      return this.mapper.toDto(user);
    } catch (error: unknown) {
      if (error instanceof DomainError) {
        throw error;
      }
      throw new UserUpdateError(
        updateUser.id,
        error instanceof Error ? error : new Error("Unknown error"),
      );
    }
  }
}
