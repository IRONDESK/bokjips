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

export interface IUserAccountSettingDataTypes {
  username: string;
  originPassword: string;
  password?: string;
  email: string;
  job: string;
}

export interface IUserLoginDataTypes {
  username: string;
  password: string;
}

export interface IFindAccountDtosType {
  username?: string;
  email: string;
  job: string;
  dateOfBirth: Date;
}
