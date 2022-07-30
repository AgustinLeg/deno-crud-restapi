import { Response, Request, V4, BodyJson } from "../deps.ts";

interface User {
  id: string;
  name: string;
}

let users: User[] = [
  {
    id: V4.uuid(),
    name: "Agustin",
  },
];

export const getUsers = ({ response }: { response: Response }) => {
  response.body = {
    message: "successful query",
    users,
  };
};
export const getUser = ({
  params,
  response,
}: {
  params: { id: string };
  response: Response;
}) => {
  const user = users.find((u) => u.id === params.id);

  if (!user) {
    response.status = 404;
    return (response.body = {
      message: `User with id "${params.id}" not found`,
    });
  }

  response.body = {
    message: "successful query",
    user,
  };
};

export const createUser = async ({
  request,
  response,
}: {
  request: Request;
  response: Response;
}) => {
  if (!request.hasBody) {
    response.status = 400;
    response.body = { message: "bad request" };
    return;
  }
  const body: BodyJson = request.body({ type: "json" });
  const value: User = await body.value;

  if (!value.name) {
    response.status = 400;
    response.body = { message: "bad request" };
    return;
  }

  const newUser: User = {
    name: value.name,
    id: V4.uuid(),
  };

  users.push(newUser);

  response.status = 201;
  response.body = { users };
};

export const deleteUser = ({
  params,
  response,
}: {
  params: { id: string };
  response: Response;
}) => {
  const user = users.find((u) => u.id === params.id);

  if (!user) {
    response.status = 404;
    return (response.body = {
      message: `User with id "${params.id}" not found`,
    });
  }

  users = users.filter((usr) => usr.id !== params.id);

  response.body = {
    message: "successful query",
    users,
  };
};

export const updateUser = async ({
  request,
  response,
  params,
}: {
  request: Request;
  response: Response;
  params: { id: string };
}) => {
  if (!request.hasBody) {
    response.status = 400;
    response.body = { message: "bad request" };
    return;
  }
  const body: BodyJson = request.body({ type: "json" });
  const value: User = await body.value;

  if (!value.name) {
    response.status = 400;
    response.body = { message: "bad request" };
    return;
  }

  const updatedUser: User | undefined = users.find(
    (usr) => usr.id === params.id
  );
  if (!updatedUser) {
    response.status = 404;
    return (response.body = {
      message: `User with id "${params.id}" not found`,
    });
  }

  users = users.map((usr) => {
    if (usr.id === params.id) {
      return { ...usr, name: value.name };
    }
    return usr;
  });

  response.status = 202;
  response.body = {
    message: "successful query",
    users,
  };
};
