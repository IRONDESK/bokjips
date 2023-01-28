import axios from "axios";
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
export const URL =
  "https://port-0-bokjips-api-fao2flc0olupf.gksl2.cloudtype.app";

function AccountInfoEdit(data: IUserAccountSettingDataTypes, token: string) {
  return axios.put(`${URL}/account/info`, data, {
    headers: { Authorization: token },
  });
}
function FindIdAccount(data: IFindAccountDtosType) {
  return axios.post(`${URL}/account/username`, data);
}
function ResetPasswordAccount(data: IFindAccountDtosType) {
  return axios.post(`${URL}/account/password`, data);
}

export { AccountInfoEdit, FindIdAccount, ResetPasswordAccount };
