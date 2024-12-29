/**
 * @description ユーザーのデータ転送オブジェクト
 * データベースやAPIとの通信に使用される形式を定義
 */
export type UserDto = Readonly<{
  id: string;
  name: string;
}>;
