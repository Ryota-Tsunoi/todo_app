import { RequestIdVariables } from "hono/request-id";
import { UserInteractor } from "../features/users/application/user.interactor";

export type Interactors = {
  userInteractor: UserInteractor;
};

export type HonoEnv = {
  Variables: {
    interactors: Interactors;
    requestId: RequestIdVariables;
  };
};
