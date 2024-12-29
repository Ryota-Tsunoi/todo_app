# クリーンアーキテクチャを採用した TypeScript プロジェクト

## 目次

- [Getting Started](#getting-started)
- [アーキテクチャ概要](#アーキテクチャ概要)
- [ディレクトリ構成](#ディレクトリ構成)
- [新機能の追加手順](#新機能の追加手順)
- [エラーハンドリング](#エラーハンドリング)
- [コーディング規約](#コーディング規約)

## Getting Started

### 必要要件

- Bun v1.0.0 以上
- Node.js v20.0.0 以上
- Volta（Node.js バージョン管理）

### インストール手順

```bash
# リポジトリのクローン
git clone <This Project>

# プロジェクトディレクトリに移動
cd <Project Directory>

# 依存パッケージのインストール
bun install
```

### 開発サーバーの起動

```bash
# 開発モードで起動（ホットリロード有効）
bun run dev
```

## スクリプトコマンド

### 開発コマンド

| コマンド      | 説明                                     |
| :------------ | :--------------------------------------- |
| `bun run dev` | 開発サーバーを起動（ホットリロード有効） |

### コード品質管理

| コマンド               | 説明                                         |
| :--------------------- | :------------------------------------------- |
| `bun run format`       | Biome によるコードフォーマットを実行         |
| `bun run format:write` | Biome によるコードフォーマットを実行して保存 |
| `bun run lint`         | Biome によるコード検証を実行                 |

### Git Hooks

| フック        | 実行されるコマンド         |
| :------------ | :------------------------- |
| pre-commit    | なし                       |
| pre-push      | `bun lint` と `bun format` |
| post-checkout | `bun lint` と `bun format` |

## アーキテクチャ概要

このプロジェクトは、以下の設計原則に基づいています：

### レイヤー構成

- **Domain Layer**: ビジネスロジックの中核
- **Application Layer**: ユースケースの実装
- **Infrastructure Layer**: 外部サービスとの連携
- **Presentation Layer**: API エンドポイントの定義

### 依存関係の方向

- 外側のレイヤーから内側のレイヤーへの依存のみを許可
- 依存性逆転の原則を採用

## ディレクトリ構成

### プロジェクト全体の構成

```plaintext
src/
├── features/               # 機能ごとのモジュール
├── common/                 # 共通モジュール
│   ├── domain/            # 共通ドメインロジック
│   │   ├── entity/       # 基底エンティティ
│   │   └── value-object/ # 基底値オブジェクト
│   └── utils/             # ユーティリティ関数
├── config/                 # 設定ファイル
│   ├── env/               # 環境変数定義
│   └── constants/         # 定数定義
├── exceptions/             # 例外定義
│   ├── baseException.ts
│   ├── httpException.ts
│   └── errorCodes.ts
├── injections/             # DIコンテナ
├── middlewares/            # ミドルウェア
├── types/                  # 型定義
├── app.ts                  # アプリケーションの初期化処理
└── index.ts                # アプリケーションのエントリーポイント
```

### 機能モジュールの構成

各機能（feature）は以下の構造を持ちます：

```plaintext
features/
└── users/                 # 例：ユーザー機能
    ├── domain/            # ドメイン層
    │   ├── entity/       # エンティティ
    │   ├── value-object/ # 値オブジェクト
    │   ├── repository/   # リポジトリインターフェース
    │   └── error/        # ドメインエラー
    ├── application/       # アプリケーション層
    │   └── interactor/   # ユースケース実装
    ├── infrastructure/    # インフラ層
    │   ├── repository/   # リポジトリ実装
    │   ├── dto/          # データ転送オブジェクト
    │   └── mapper/       # マッパー
    └── presentation/      # プレゼンテーション層
        ├── handler/       # リクエストハンドラー
        ├── routes/        # ルーティング定義
        ├── request/       # リクエストスキーマ
        └── response/      # レスポンススキーマ
```

### 各ディレクトリの役割

#### 共通モジュール（common/）

- **domain/**: 全機能で共有するドメインロジック
- **utils/**: ユーティリティ関数や共通ヘルパー

#### 設定（config/）

- **env/**: 環境変数の定義と型
- **constants/**: アプリケーション全体で使用する定数

#### 例外（exceptions/）

- アプリケーション全体で使用する例外クラスとエラーコード

#### ミドルウェア（middlewares/）

- **auth/**: 認証・認可関連のミドルウェア
- **validation/**: リクエストバリデーション
- **error/**: エラーハンドリングミドルウェア

#### 型定義（types/）

- アプリケーション全体で使用する共通の型定義

## 新機能の追加手順

新しい機能を追加する際は、以下の手順に従ってください：

### ドメイン層の実装

- エンティティの定義
- 値オブジェクトの定義
- リポジトリインターフェースの定義
- ドメインエラーの定義

### アプリケーション層の実装

- ユースケースの定義
- インタラクターの実装

### インフラ層の実装

- DTO の定義
- マッパーの実装
- リポジトリの実装

### プレゼンテーション層の実装

- ルーティングの定義
- リクエストハンドラーの実装
- レスポンス型の定義

---

## エラーハンドリング

### エラー階層

```plaintext
BaseException
├── DomainError
│   ├── InvalidUserIdError
│   ├── InvalidUserNameError
│   ├── UserNotFoundError
│   ├── UserUpdateError
│   └── UserFetchError
└── HttpException
    ├── BadRequestException
    ├── NotFoundException
    ├── ConflictException
    └── InternalServerErrorException
```

## エラーコード体系

エラーコードは `FF_CCC_NNN` の形式で定義:

- **FF**: 機能カテゴリ (例: `US` = User)
- **CCC**: コンポーネント (例: `VAL` = Validation)
- **NNN**: エラー番号 (001-999)

---

## エラーハンドリングの原則

1. ドメイン層では `DomainError` を使用
2. インフラ層ではドメインエラーを変換せずに伝播
3. アプリケーション層で適切な HTTP 例外に変換
4. エラーの原因（cause）を保持して伝播

---

## コーディング規約

### 命名規則

- **クラス名**: PascalCase
- **メソッド名**: camelCase
- **インターフェース名**: PascalCase
- **定数**: UPPER_SNAKE_CASE

### 型安全性

- 可能な限り `unknown` 型を使用
- 型アサーションは最小限に
- `readonly` 修飾子の積極的な使用

### エラーハンドリングの注意点

- `try-catch` ブロックの適切な使用
- エラーメッセージの具体化
- エラーの原因を常に保持

### ドキュメント

- JSDoc 形式でのコメント記述
- パブリック API の完全なドキュメント化
- 発生する可能性のあるエラーの明示
