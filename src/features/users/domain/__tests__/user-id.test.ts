/**
 * @description UserId Value Objectのテスト
 */
import { describe, expect, it } from "bun:test";
import { nanoid } from "nanoid";
import { InvalidUserIdError } from "../error/domain-error";
import { UserId } from "../value-object/user-id";

describe("UserId", () => {
  describe("constructor", () => {
    it("有効なIDで正常にインスタンスが生成されること", () => {
      const validId = nanoid();
      const userId = new UserId(validId);
      expect(userId.value).toBe(validId);
    });

    it("不正なフォーマットのIDでInvalidUserIdErrorがスローされること", () => {
      const invalidIds = [
        "", // 空文字列
        "abc", // 短すぎる
        "abc".repeat(10), // 長すぎる
        "!!!@@@###", // 不正な文字を含む
        "12345", // 数字のみ
      ];

      for (const invalidId of invalidIds) {
        expect(() => new UserId(invalidId)).toThrow(InvalidUserIdError);
      }
    });
  });

  describe("equals", () => {
    it("同じ値を持つUserId同士が等価と判定されること", () => {
      const id = nanoid();
      const userId1 = new UserId(id);
      const userId2 = new UserId(id);
      expect(userId1.equals(userId2)).toBe(true);
    });

    it("異なる値を持つUserId同士が非等価と判定されること", () => {
      const userId1 = new UserId(nanoid());
      const userId2 = new UserId(nanoid());
      expect(userId1.equals(userId2)).toBe(false);
    });

    it("nullと比較した場合に非等価と判定されること", () => {
      const userId = new UserId(nanoid());
      expect(userId.equals(null as any)).toBe(false);
    });

    it("undefinedと比較した場合に非等価と判定されること", () => {
      const userId = new UserId(nanoid());
      expect(userId.equals(undefined as any)).toBe(false);
    });
  });
});
