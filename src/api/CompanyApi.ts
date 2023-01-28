import axios from "axios";
import { ServerURL } from "./ServerURL";
import { ICompanyDataTypes, IWelfareDataTypes } from "../types/CompanyData";

export const fetcher = (url: string) => axios.get(url).then((res) => res.data);

function CreateCompanyData(data: ICompanyDataTypes, token: string) {
  return axios.post(`${ServerURL}/admin/info`, data, {
    headers: { Authorization: token },
  });
}
function EditCompanyData(data: ICompanyDataTypes, token: string) {
  return axios.put(`${ServerURL}/admin/info`, data, {
    headers: { Authorization: token },
  });
}
function DeleteCompanyData(companyId: string, token: string) {
  return axios.delete(`${ServerURL}/admin/info/${companyId}`, {
    headers: { Authorization: token },
  });
}
function CreateWelfaresData(
  companyId: string,
  data: IWelfareDataTypes[],
  token: string,
  type: "create" | "edit"
) {
  if (type === "create") {
    return axios.post(`${ServerURL}/admin/info/welfare/${companyId}`, data, {
      headers: { Authorization: token },
    });
  } else {
    return axios.put(`${ServerURL}/admin/info/welfare/${companyId}`, data, {
      headers: { Authorization: token },
    });
  }
}
function HandlerCompanyFavorite(companyId: string, token: string) {
  return axios.post(
    `${ServerURL}/favorite/${companyId}`,
    {},
    {
      headers: { Authorization: token },
    }
  );
}

export {
  CreateCompanyData,
  EditCompanyData,
  DeleteCompanyData,
  CreateWelfaresData,
  HandlerCompanyFavorite,
};
