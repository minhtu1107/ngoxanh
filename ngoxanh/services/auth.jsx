import { setCookie, parseCookies, destroyCookie } from 'nookies';

// const conf = require('../config/const.json');

const isAdmin = async (context) => {
  const session = await getSessionFromContext(context);
  if (!session || session.role !== "conf.role.admin") {
    return false;
  }
  return true;
};

const getSessionFromContext = async (context) => {
  const session = parseCookies(context);
  let t = JSON.parse(session);
  if (!t) {
    return null;
  }
  return t;
}

const getToken = async ({ req }) => {
  const session = await getSessionFromContext({req});
  // console.log("ssssssss " + JSON.stringify(session));

  return session.access_token;
};

const setUserCookie = (context, key, data) => {
  const options = {
    maxAge: 24 * 60 * 60,
    path: '/',
  };
  setCookie(context, key, JSON.stringify(data), options);
}

export {
  isAdmin,
  getSessionFromContext,
  getToken,
  setUserCookie,
};