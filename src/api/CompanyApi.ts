import axios from "axios";
import useSWR from "swr";

const URL = "/data/corp.json";

function AllCompany() {
  return axios.get(`${URL}`);
}

function CompanyById(id: string) {
  return axios.get(`${URL}/detail?id=${id}`);
}

export { AllCompany, CompanyById };
