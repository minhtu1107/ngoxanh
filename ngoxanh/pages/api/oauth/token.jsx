import axios from "axios";

export default async (req, res) => {
  
  /*var body = {};
  body["username"] = req.body.email;
  body["password"] = req.body.password;
  body["grant_type"] = "password";

  const params = {
    method: req.method,
    url: `${process.env.API_BASE_URL}/oauth/token`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization' : "Basic " + Buffer.from("cntl:secret").toString('base64'),
    },
    data: body,
    params:body,
  };

  debugger
  return axios(params)
    .then((response) => {      
      res.status(200);
      let session = {
        id: response.data.id,
        email: response.data.email,
        access_token: response.data.access_token,
        role: response.data.role
      }
      res.json(session);
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
      userName: req.body.userName,
    }
    res.json(session);
    return res.end();
};