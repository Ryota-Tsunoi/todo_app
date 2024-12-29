import { UserInteractor } from "../features/users/application/user.interactor";
import { UserMapper } from "../features/users/infrastructure/mapper/user.mapper";
import { initializeRepositories } from "./repositories.initialize";

export type Interactors = {
  userInteractor: UserInteractor;
};

export const initializeInteractors = (): Interactors => {
  const repositories = initializeRepositories();
  return {
    userInteractor: new UserInteractor(
      repositories.userRepository,
      new UserMapper(),
    ),
  };
};
