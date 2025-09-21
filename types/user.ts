export type User = {
  name: string;
  email: string;
  avatar: string | null;
};
export type RegisterUser = {
  email: string;
  password: string;
  name?: string;
};