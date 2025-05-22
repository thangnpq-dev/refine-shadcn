export declare namespace NUser {
  export type IUser = BaseDto & {
    fullName: string;
    role: RoleEnum;
    phone: string;
    status: UserStatus;
  };

  export type IUserIdentity = {
    id: string;
    name: string;
    email: string;
  };
}