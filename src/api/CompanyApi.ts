import axios from "axios";
import { ICompanyDataTypes, IWelfareDataTypes } from "../types/CompanyData";

export const fetcher = (url: string) => axios.get(url).then((res) => res.data);
export const URL =
  "https://port-0-bokjips-api-fao2flc0olupf.gksl2.cloudtype.app";

function CreateCompanyData(data: ICompanyDataTypes, token: string) {
  return axios.post(`${URL}/admin/info`, data, {
    // headers: { Authorization: `Bearer ${token}` },
    headers: { Authorization: token },
  });
}
function EditCompanyData(data: ICompanyDataTypes, token: string) {
  return axios.put(`${URL}/admin/info`, data, {
    // headers: { Authorization: `Bearer ${token}` },
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
    return axios.post(`${URL}/admin/info/welfare/${companyId}`, data, {
      // headers: { Authorization: `Bearer ${token}` },
      headers: { Authorization: token },
    });
  } else {
    return axios.put(`${URL}/admin/info/welfare/${companyId}`, data, {
      // headers: { Authorization: `Bearer ${token}` },
      headers: { Authorization: token },
    });
  }
}

export { CreateCompanyData, EditCompanyData, CreateWelfaresData };
