import axios from "axios";
import { ICompanyDataTypes, ICompanyWelfaresTypes } from "../types/CompanyData";

export const fetcher = (url: string) => axios.get(url).then((res) => res.data);
export const URL =
  "https://port-0-bokjips-api-fao2flc0olupf.gksl2.cloudtype.app";

function CreateCompanyData(data: ICompanyDataTypes) {
  return axios.post(`${URL}/admin/info`, data);
}
function CreateWelfaresData(companyId: string, data: ICompanyWelfaresTypes) {
  return axios.post(`${URL}/admin/info/welfare/${companyId}`, data);
}

export { CreateCompanyData, CreateWelfaresData };
