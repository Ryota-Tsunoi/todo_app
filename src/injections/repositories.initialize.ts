import { UserRepository } from "../features/users/domain/repository/user.repository";
import { UserMapper } from "../features/users/infrastructure/mapper/user.mapper";
import { UserRepositoryImpl } from "../features/users/infrastructure/repository/user.repository";

type Repositories = {
  userRepository: UserRepository;
};

export const initializeRepositories = (): Repositories => {
  return {
    userRepository: new UserRepositoryImpl(new UserMapper()),
  };
};
