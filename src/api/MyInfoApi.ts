import axios from "axios";

export const fetcher = (url: string, token: string) =>
  axios
    .get(url, {
      headers: { Authorization: token },
    })
    .then((res) => res.data);
export const URL =
  "https://port-0-bokjips-api-fao2flc0olupf.gksl2.cloudtype.app";
