import axios from "axios";
import { ServerURL } from "./ServerURL";
import { IUserLoginDataTypes, IUserSignUpDataTypes } from "../types/UserData";

export const fetcher = (url: string) => axios.get(url).then((res) => res.data);

function MemberSignUp(data: IUserSignUpDataTypes) {
  return axios.post(`${ServerURL}/signup`, data);
}
function MemberLogin(data: IUserLoginDataTypes) {
  return axios.post(`${ServerURL}/login`, data);
}

export { MemberSignUp, MemberLogin };
