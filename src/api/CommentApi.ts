import axios from "axios";

export const fetcher = (url: string, token: string) =>
  axios
    .get(url, {
      // headers: { Authorization: `Bearer ${token}` },
      headers: { Authorization: token },
    })
    .then((res) => res.data);
export const URL =
  "https://port-0-bokjips-api-fao2flc0olupf.gksl2.cloudtype.app";

function CreateCommentData(companyId: string, data: string, token: string) {
  return axios.post(
    `${URL}/comment/${companyId}`,
    { content: data },
    {
      // headers: { Authorization: `Bearer ${token}` },
      headers: { Authorization: token },
    }
  );
}

function DeleteCommentData(commentId: string, token: string) {
  return axios.delete(`${URL}/comment/${commentId}`, {
    // headers: { Authorization: `Bearer ${token}` },
    headers: { Authorization: token },
  });
}

export { CreateCommentData, DeleteCommentData };
