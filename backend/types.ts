export type CustomRequest = Request & {
  user?: User;
};

export type User = {
  id: number;
  name: string;
  email: string;
};
