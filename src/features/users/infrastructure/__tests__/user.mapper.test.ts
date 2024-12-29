/**
 * @description UserMapperのテスト
 */
import { describe, expect, it } from "bun:test";
import { nanoid } from "nanoid";
import { User } from "../../domain/entity/user";
import { UserId } from "../../domain/value-object/user-id";
import { UserName } from "../../domain/value-object/user-name";
import { UserDto } from "../dto/user.dto";
import { UserMapper } from "../mapper/user.mapper";

describe("UserMapper", () => {
  const mapper = new UserMapper();

  describe("toEntity", () => {
    it("DTOからエンティティに正しく変換できること", () => {
      const dto: UserDto = {
        id: nanoid(),
        name: "John Doe",
      };

      const entity = mapper.toEntity(dto);

      expect(entity).toBeInstanceOf(User);
      expect(entity.id).toBeInstanceOf(UserId);
      expect(entity.name).toBeInstanceOf(UserName);
      expect(entity.id.value).toBe(dto.id);
      expect(entity.name.value).toBe(dto.name);
    });
  });

  describe("toDto", () => {
    it("エンティティからDTOに正しく変換できること", () => {
      const id = nanoid();
      const name = "John Doe";
      const entity = new User(new UserId(id), new UserName(name));

      const dto = mapper.toDto(entity);

      expect(dto.id).toBe(id);
      expect(dto.name).toBe(name);
    });
  });
});
