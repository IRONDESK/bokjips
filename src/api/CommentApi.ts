import axios from "axios";
import { ServerURL } from "./ServerURL";

export const fetcher = (url: string, token: string) =>
  axios
    .get(url, {
      headers: { Authorization: token },
    })
    .then((res) => res.data);

function CreateCommentData(companyId: string, data: string, token: string) {
  return axios.post(
    `${ServerURL}/comment/${companyId}`,
    { content: data },
    {
      headers: { Authorization: token },
    }
  );
}

function DeleteCommentData(commentId: string, token: string) {
  return axios.delete(`${ServerURL}/comment/${commentId}`, {
    headers: { Authorization: token },
  });
}

export { CreateCommentData, DeleteCommentData };
