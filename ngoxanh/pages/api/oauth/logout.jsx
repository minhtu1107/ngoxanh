import axios from "axios";
import { getToken } from "../../../services/auth";
import { getDefaultHeaders } from "../../../services/util";

export default async (req, res) => {
  /*console.log("logout get token ");
  const token = await getToken({ req });
  const headers = getDefaultHeaders(token);
  const params = {
    method: req.method,
    url: `${process.env.API_BASE_URL}/oauth/logout`,
    headers: headers,
  };

  console.log("logout token " + JSON.stringify(token));

  debugger
  return axios(params)
    .then((response) => {
      // console.log("success", response.data);
      res.status(200);
      res.json(response.data);
      return res.end();
    })
    .catch((err) => {
      console.log("err", err);
      res.status(err.response.status);
      res.json(err.response.data);
      return res.end();
    });*/

    //developer mode
    res.status(200);
    let session = {
      msg: 'log out success',
    }
    res.json(session);
    return res.end();
};