/**
 * @description Userエンティティのテスト
 */
import { describe, expect, it } from "bun:test";
import { nanoid } from "nanoid";
import { User } from "../entity/user";
import { UserId } from "../value-object/user-id";
import { UserName } from "../value-object/user-name";

describe("User", () => {
  describe("constructor", () => {
    it("有効なIDと名前で正常にインスタンスが生成されること", () => {
      const id = new UserId(nanoid());
      const name = new UserName("John Doe");
      const user = new User(id, name);

      expect(user.id).toBe(id);
      expect(user.name).toBe(name);
    });
  });

  describe("changeName", () => {
    it("新しい名前で更新された新しいUserインスタンスが返されること", () => {
      const id = new UserId(nanoid());
      const originalName = new UserName("John Doe");
      const user = new User(id, originalName);

      const newName = new UserName("Jane Doe");
      const updatedUser = user.changeName(newName);

      // 新しいインスタンスが返されることを確認
      expect(updatedUser).not.toBe(user);

      // 値が正しく更新されていることを確認
      expect(updatedUser.id).toBe(id);
      expect(updatedUser.name).toBe(newName);

      // 元のインスタンスが変更されていないことを確認（不変性）
      expect(user.name).toBe(originalName);
    });
  });
});
