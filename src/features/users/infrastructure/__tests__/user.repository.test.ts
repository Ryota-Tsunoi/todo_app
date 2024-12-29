/**
 * @description UserRepositoryImplのテスト
 */
import { beforeEach, describe, expect, it, mock } from "bun:test";
import { nanoid } from "nanoid";
import { User } from "../../domain/entity/user";
import {
  UserFetchError,
  UserNotFoundError,
  UserUpdateError,
} from "../../domain/error/domain-error";
import { UserId } from "../../domain/value-object/user-id";
import { UserName } from "../../domain/value-object/user-name";
import { UserDto } from "../dto/user.dto";
import { UserMapper } from "../mapper/user.mapper";
import { UserRepositoryImpl } from "../repository/user.repository";

// テスト用のインメモリストア
const testUsers: User[] = [];

// UserRepositoryImplをテスト用に拡張
class TestUserRepositoryImpl extends UserRepositoryImpl {
  // テスト用にユーザーストアを上書き
  public users: User[] = testUsers;
}

describe("UserRepositoryImpl", () => {
  const mapper = new UserMapper();
  let repository: TestUserRepositoryImpl = new TestUserRepositoryImpl(mapper);

  // 各テストの前にリポジトリとストアを初期化
  beforeEach(() => {
    testUsers.length = 0; // 配列を空にする
    repository = new TestUserRepositoryImpl(mapper);
  });

  // テストデータの作成ヘルパー
  const createTestUser = () => {
    const id = nanoid();
    const name = "Test User";
    return new User(new UserId(id), new UserName(name));
  };

  describe("getMany", () => {
    it("正常にユーザー一覧を取得できること", async () => {
      // テストデータを追加
      const user1 = createTestUser();
      const user2 = createTestUser();
      testUsers.push(user1, user2);
      const result = await repository.getMany();

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(2);

      // 各要素がUserDtoの形式であることを確認
      for (const user of result) {
        expect(user).toHaveProperty("id");
        expect(user).toHaveProperty("name");
      }
    });

    it("エラー発生時にUserFetchErrorがスローされること", async () => {
      const errorMapper: UserMapper = {
        ...mapper,
        toDto: mock(() => {
          throw new Error("Mapping error");
        }),
        toEntity: mock(() => {
          throw new Error("Mapping error");
        }),
      };
      const errorRepository = new TestUserRepositoryImpl(errorMapper);
      testUsers.push(createTestUser());

      await expect(errorRepository.getMany()).rejects.toThrow(UserFetchError);
    });
  });

  describe("getOne", () => {
    it("存在するユーザーを正常に取得できること", async () => {
      const user = createTestUser();
      testUsers.push(user);

      const result = await repository.getOne(user.id.value);
      expect(result.id).toBe(user.id.value);
      expect(result.name).toBe(user.name.value);
    });

    it("存在しないユーザーIDの場合にUserNotFoundErrorがスローされること", async () => {
      const nonExistentId = nanoid();
      await expect(repository.getOne(nonExistentId)).rejects.toThrow(
        UserNotFoundError,
      );
    });

    it("マッピングエラー時にUserFetchErrorがスローされること", async () => {
      const user = createTestUser();
      testUsers.push(user);

      const errorMapper: UserMapper = {
        ...mapper,
        toDto: mock(() => {
          throw new Error("Mapping error");
        }),
        toEntity: mock(() => {
          throw new Error("Mapping error");
        }),
      };
      const errorRepository = new TestUserRepositoryImpl(errorMapper);

      await expect(errorRepository.getOne(user.id.value)).rejects.toThrow(
        UserFetchError,
      );
    });
  });

  describe("update", () => {
    it("正常にユーザーを更新できること", async () => {
      // 事前にユーザーを作成
      const user = createTestUser();
      testUsers.push(user);

      // 更新データの準備
      const updatedName = "Updated Name";
      const updateDto: UserDto = {
        id: user.id.value,
        name: updatedName,
      };

      const result = await repository.update(updateDto);
      expect(result.id).toBe(user.id.value);
      expect(result.name).toBe(updatedName);

      // ストアの状態も確認
      const updatedUser = testUsers.find((u) => u.id.value === user.id.value);
      expect(updatedUser?.name.value).toBe(updatedName);
    });

    it("存在しないユーザーの更新時にUserNotFoundErrorがスローされること", async () => {
      const nonExistentUserDto: UserDto = {
        id: nanoid(),
        name: "Non Existent User",
      };

      await expect(repository.update(nonExistentUserDto)).rejects.toThrow(
        UserNotFoundError,
      );
    });

    it("更新時のエラーでUserUpdateErrorがスローされること", async () => {
      const user = createTestUser();
      testUsers.push(user);

      const errorMapper: UserMapper = {
        ...mapper,
        toEntity: mock(() => {
          throw new Error("Update error");
        }),
        toDto: mock(() => {
          throw new Error("Update error");
        }),
      };
      const errorRepository = new TestUserRepositoryImpl(errorMapper);

      const userDto: UserDto = {
        id: user.id.value,
        name: "Test User",
      };

      await expect(errorRepository.update(userDto)).rejects.toThrow(
        UserUpdateError,
      );
      await expect(errorRepository.update(userDto)).rejects.toThrowError(
        "Failed to update user",
      );
    });
  });
});
