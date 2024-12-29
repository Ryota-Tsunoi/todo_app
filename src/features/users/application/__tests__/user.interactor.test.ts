/**
 * @description UserInteractorのテスト
 */
import { describe, expect, it, mock } from "bun:test";
import { nanoid } from "nanoid";
import {
  InternalServerErrorException,
  NotFoundException,
} from "../../../../exceptions/httpException";
import { User } from "../../domain/entity/user";
import {
  UserFetchError,
  UserNotFoundError,
  UserUpdateError,
} from "../../domain/error/domain-error";
import { UserRepository } from "../../domain/repository/user.repository";
import { UserDto } from "../../infrastructure/dto/user.dto";
import { UserMapper } from "../../infrastructure/mapper/user.mapper";
import { UserInteractor } from "../user.interactor";

describe("UserInteractor", () => {
  const mockRepository = {
    getMany: mock(() => Promise.resolve([])),
    getOne: mock(() => Promise.resolve({ id: nanoid(), name: "John Doe" })),
    update: mock(() => Promise.resolve({ id: nanoid(), name: "Updated Name" })),
  } as unknown as UserRepository;

  const mapper = new UserMapper();
  const interactor = new UserInteractor(mockRepository, mapper);

  describe("fetchListUsers", () => {
    it("正常にユーザー一覧を取得できること", async () => {
      const mockUsers: UserDto[] = [
        { id: nanoid(), name: "User 1" },
        { id: nanoid(), name: "User 2" },
      ];
      mockRepository.getMany = mock(() => Promise.resolve(mockUsers));

      const result = await interactor.fetchListUsers();
      expect(result.length).toBe(2);
      expect(result[0]).toBeInstanceOf(User);
      expect(result[1]).toBeInstanceOf(User);
    });

    it("エラー発生時に適切な例外が投げられること", async () => {
      mockRepository.getMany = mock(() => {
        throw new UserFetchError("Failed to fetch users");
      });

      await expect(interactor.fetchListUsers()).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe("fetchUser", () => {
    const validId = nanoid();

    it("正常にユーザーを取得できること", async () => {
      const mockUser: UserDto = { id: validId, name: "John Doe" };
      mockRepository.getOne = mock(() => Promise.resolve(mockUser));

      const result = await interactor.fetchUser(validId);
      expect(result).toBeInstanceOf(User);
      expect(result.id.value).toBe(validId);
      expect(result.name.value).toBe("John Doe");
    });

    it("存在しないユーザーIDの場合にNotFoundExceptionが投げられること", async () => {
      mockRepository.getOne = mock(() => {
        throw new UserNotFoundError(validId);
      });

      await expect(interactor.fetchUser(validId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe("updateUser", () => {
    const validId = nanoid();
    const validName = "Updated Name";

    it("正常にユーザーを更新できること", async () => {
      // 現在のユーザーの取得をモック
      const currentUser: UserDto = { id: validId, name: "Original Name" };
      mockRepository.getOne = mock(() => Promise.resolve(currentUser));

      // 更新後のユーザーをモック
      const mockUpdatedUser: UserDto = { id: validId, name: validName };
      mockRepository.update = mock(() => Promise.resolve(mockUpdatedUser));

      const result = await interactor.updateUser(validId, validName);
      expect(result).toBeInstanceOf(User);
      expect(result.id.value).toBe(validId);
      expect(result.name.value).toBe(validName);
    });

    it("更新失敗時にInternalServerErrorExceptionが投げられること", async () => {
      // 現在のユーザーの取得をモック
      const currentUser: UserDto = { id: validId, name: "Original Name" };
      mockRepository.getOne = mock(() => Promise.resolve(currentUser));

      // 更新時にエラーを投げるようにモック
      mockRepository.update = mock(() => {
        throw new UserUpdateError(validId);
      });

      await expect(interactor.updateUser(validId, validName)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
