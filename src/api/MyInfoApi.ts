import axios from "axios";
import { ServerURL } from "./ServerURL";
import {
  IFindAccountDtosType,
  IUserAccountSettingDataTypes,
} from "../types/UserData";

export const swrFetcher = (url: string, token: string) =>
  axios
    .get(url, {
      headers: { Authorization: token },
    })
    .then((res) => res.data);

function AccountInfoEdit(data: IUserAccountSettingDataTypes, token: string) {
  return axios.put(`${ServerURL}/account/info`, data, {
    headers: { Authorization: token },
  });
}
function FindIdAccount(data: IFindAccountDtosType) {
  return axios.post(`${ServerURL}/account/username`, data);
}
function ResetPasswordAccount(data: IFindAccountDtosType) {
  return axios.post(`${ServerURL}/account/password`, data);
}

export { AccountInfoEdit, FindIdAccount, ResetPasswordAccount };
