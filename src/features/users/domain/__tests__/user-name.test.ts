/**
 * @description UserName Value Objectのテスト
 */
import { describe, expect, it } from "bun:test";
import { InvalidUserNameError } from "../error/domain-error";
import { UserName } from "../value-object/user-name";

describe("UserName", () => {
  describe("constructor", () => {
    it("有効なユーザー名で正常にインスタンスが生成されること", () => {
      const validName = "John Doe";
      const userName = new UserName(validName);
      expect(userName.value).toBe(validName);
    });

    it("最小長（1文字）のユーザー名で正常にインスタンスが生成されること", () => {
      const validName = "J";
      const userName = new UserName(validName);
      expect(userName.value).toBe(validName);
    });

    it("最大長（20文字）のユーザー名で正常にインスタンスが生成されること", () => {
      const validName = "abcdefghijklmnopqrst"; // 20文字
      const userName = new UserName(validName);
      expect(userName.value).toBe(validName);
    });

    it("空文字列の場合にInvalidUserNameErrorがスローされること", () => {
      const invalidName = "";
      expect(() => new UserName(invalidName)).toThrow(InvalidUserNameError);
    });

    it("21文字以上の場合にInvalidUserNameErrorがスローされること", () => {
      const invalidName = "abcdefghijklmnopqrstu"; // 21文字
      expect(() => new UserName(invalidName)).toThrow(InvalidUserNameError);
    });
  });

  describe("equals", () => {
    it("同じ値を持つUserName同士が等価と判定されること", () => {
      const name1 = new UserName("John Doe");
      const name2 = new UserName("John Doe");
      expect(name1.equals(name2)).toBe(true);
    });

    it("異なる値を持つUserName同士が非等価と判定されること", () => {
      const name1 = new UserName("John Doe");
      const name2 = new UserName("Jane Doe");
      expect(name1.equals(name2)).toBe(false);
    });

    it("nullと比較した場合に非等価と判定されること", () => {
      const name = new UserName("John Doe");
      expect(name.equals(null as any)).toBe(false);
    });

    it("undefinedと比較した場合に非等価と判定されること", () => {
      const name = new UserName("John Doe");
      expect(name.equals(undefined as any)).toBe(false);
    });
  });
});
