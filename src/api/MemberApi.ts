import axios from "axios";
import { IUserLoginDataTypes, IUserSignUpDataTypes } from "../types/UserData";

export const fetcher = (url: string) => axios.get(url).then((res) => res.data);
export const URL =
  "https://port-0-bokjips-api-fao2flc0olupf.gksl2.cloudtype.app";

function MemberSignUp(data: IUserSignUpDataTypes) {
  return axios.post(`${URL}/signup`, data);
}
function MemberLogin(data: IUserLoginDataTypes) {
  return axios.post(`${URL}/login`, data);
}

export { MemberSignUp, MemberLogin };
