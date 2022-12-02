import axios from "axios";
import { IUserLoginDataTypes } from "../types/UserData";

const URL = "http://192.168.154.142:8080/members";

function MemberLogin(data: IUserLoginDataTypes) {
  return axios.post(`${URL}/login`, data);
}

export { MemberLogin };
