import axios from "axios";
import useSWR from "swr";

const URL = "http://192.168.154.142:8080/company";

function AllCompany() {
  return axios.get(`${URL}/index`);
}

function CompanyById(id: string) {
  return axios.get(`${URL}/detail?id=${id}`);
}

export { AllCompany, CompanyById };
