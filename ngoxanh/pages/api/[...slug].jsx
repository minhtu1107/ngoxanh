import axios from "axios";
import { getToken } from "../../services/auth";
import { getDefaultHeaders } from "../../services/util";

export default async (req, res) => {
  // const token = await getToken({ req });
  // const headers = getDefaultHeaders(token);
  const params = {
    method: req.method,
    url: `${process.env.API_BASE_URL}/${req.query.slug.join('/')}`,
    headers: {
      'Content-Type':'x-www-form-urlencoded',
    },
    data: req.body,
    params: { id: req.query.id || -1,
              page: req.query.page || -1,
              limit: req.query.limit || -1
            }
  };

  console.log("request " + params.params.id);

  debugger
  return axios(params)
    .then((response) => {
      console.log("success", response.data);
      res.status(200);
      res.json(response.data);
      return res.end();
    })
    .catch((err) => {
      console.log("err", err);
      res.status(err.response.status);
      res.json(err.response.data);
      // res.json({ name: 'John Doe' });
      return res.end();
    });
};