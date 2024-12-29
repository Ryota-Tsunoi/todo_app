/**
 * @description システム全体で使用するエラーコード体系
 *
 * フォーマット: FF_CCC_NNN
 *
 * FF: 機能カテゴリ (Feature)
 *   - CM: 共通 (Common)
 *   - US: ユーザー管理 (User)
 *   - RT: ルーティング (Routing)
 *
 * CCC: コンポーネント (Component)
 *   - REQ: リクエスト処理
 *   - VAL: バリデーション
 *   - AUT: 認証・認可
 *   - SRV: サービス処理
 *   - DAT: データ処理
 *
 * NNN: 具体的なエラー番号 (000-999)
 */
export const ErrorCode = {
  // 共通エラー (CM)
  UNKNOWN_ERROR: "CM_SRV_001", // 不明なエラー
  INTERNAL_ERROR: "CM_SRV_002", // 内部サーバーエラー
  INVALID_REQUEST: "CM_REQ_001", // 不正なリクエスト
  VALIDATION_ERROR: "CM_VAL_001", // バリデーションエラー

  // ユーザー管理エラー (US)
  USER_NOT_FOUND: "US_DAT_001", // ユーザーが見つからない
  USER_ALREADY_EXISTS: "US_DAT_002", // ユーザーが既に存在する
  USER_FETCH_FAILED: "US_DAT_003", // ユーザー取得失敗
  INVALID_USER_NAME: "US_VAL_001", // 不正なユーザー名
  INVALID_USER_ID: "US_VAL_002", // 不正なユーザーID
  USER_UPDATE_VALIDATION_FAILED: "US_VAL_003", // ユーザー更新時のバリデーション失敗
  USER_UPDATE_FAILED: "US_SRV_001", // ユーザー更新失敗

  // ルーティングエラー (RT)
  ROUTE_NOT_FOUND: "RT_REQ_001", // ルートが見つからない
  METHOD_NOT_ALLOWED: "RT_REQ_002", // メソッドが許可されていない
} as const;

export type ErrorCodeType = (typeof ErrorCode)[keyof typeof ErrorCode];
