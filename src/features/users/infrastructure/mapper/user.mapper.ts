import { User } from "../../domain/entity/user";
import { UserId } from "../../domain/value-object/user-id";
import { UserName } from "../../domain/value-object/user-name";
import { UserDto } from "../dto/user.dto";

/**
 * @description ユーザーのマッパークラス
 * インフラ層とドメイン層の境界でデータ変換を担当
 */
export class UserMapper {
  toEntity(dto: UserDto): User {
    return new User(new UserId(dto.id), new UserName(dto.name));
  }

  toDto(entity: User): UserDto {
    return {
      id: entity.id.value,
      name: entity.name.value,
    };
  }
}
