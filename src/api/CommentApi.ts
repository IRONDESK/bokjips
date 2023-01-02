import axios from "axios";
import { ICommentDataTypes } from "../types/CommentData";

export const fetcher = (url: string) => axios.get(url).then((res) => res.data);
export const URL =
  "https://port-0-bokjips-api-fao2flc0olupf.gksl2.cloudtype.app";

function CreateCommentData(
  companyId: string,
  data: ICommentDataTypes,
  token: string
) {
  return axios.post(`${URL}/comment/${companyId}`, data, {
    // headers: { Authorization: `Bearer ${token}` },
    headers: { Authorization: token },
  });
}

function DeleteCommentData(companyId: string, token: string) {
  return axios.delete(`${URL}/comment/${companyId}`, {
    // headers: { Authorization: `Bearer ${token}` },
    headers: { Authorization: token },
  });
}

export { CreateCommentData, DeleteCommentData };
