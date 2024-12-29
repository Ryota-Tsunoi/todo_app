import { BadRequestException } from "../../../exceptions/httpException";
import { AppRouteHandler } from "../../../types/route-handler";
import { v1FetchUserRoute } from "./http/routes/fetch-user.route";
import { v1ListUsersRoute } from "./http/routes/list-users.route";
import { v1UpdateUserRoute } from "./http/routes/update-user.route";

export const v1ListUsers: AppRouteHandler<typeof v1ListUsersRoute> = async (
  c,
) => {
  const userInteractor = c.get("interactors").userInteractor;
  const users = await userInteractor.fetchListUsers();
  return c.json({
    users: users.map((user) => ({
      id: user.id.value,
      name: user.name.value,
    })),
  });
};

export const v1FetchUser: AppRouteHandler<typeof v1FetchUserRoute> = async (
  c,
) => {
  const userInteractor = c.get("interactors").userInteractor;
  const userId = c.req.valid("param").id;
  const user = await userInteractor.fetchUser(userId);
  return c.json({
    user: {
      id: user.id.value,
      name: user.name.value,
    },
  });
};

export const v1UpdateUser: AppRouteHandler<typeof v1UpdateUserRoute> = async (
  c,
) => {
  const body = await c.req.json().catch(() => null);
  if (!body) {
    throw new BadRequestException("Request body is required");
  }

  const userInteractor = c.get("interactors").userInteractor;
  const id = c.req.valid("param").id;
  const name = c.req.valid("json").name;
  const updatedUser = await userInteractor.updateUser(id, name);
  return c.json({
    user: {
      id: updatedUser.id.value,
      name: updatedUser.name.value,
    },
  });
};
