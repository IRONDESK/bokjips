export interface IUserDataTypes extends IUserSignUpDataTypes {
  roles: string;
  roleList: string[];
}

export interface IUserSignUpDataTypes {
  username: string;
  password: string;
  email: string;
  dateOfBirth: string;
  job: string;
}

export interface IUserLoginDataTypes {
  username: string;
  password: string;
}
