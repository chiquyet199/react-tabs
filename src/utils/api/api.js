import _ from "underscore";
import queryString from "query-string";
import {isWeb} from "../../utils/common";
import {BASE_URL} from "react-native-dotenv";

let API_URL = BASE_URL;

if (!isWeb) {
  API_URL = require("react-native-config").default.BASE_URL;
}

const {REACT_APP_MOCK_BACKEND} = process.env;
export const baseUrl = REACT_APP_MOCK_BACKEND
  ? ""
  : API_URL || "http://localhost:3333";

if (REACT_APP_MOCK_BACKEND) {
  require("./__mocks__");
}

let token = false;
export const setToken = value => {
  token = value;
};
export const unsetToken = () => {
  token = false;
};

const amznOpts = () => {
  return {
    mode: "no-cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Request-Headers": "Content-Type",
    },
  };
};

export const opts = () => {
  const options = {
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Request-Headers": "Content-Type",
    },
  };
  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  return options;
};

export const fetchError = response => {
  if (response && response.error) {
    const {error} = response;
    throw {error}; // eslint-disable-line no-throw-literal
  } else {
    throw {error: {message: "Something went wrong!"}}; // eslint-disable-line no-throw-literal
  }
};
const throwErrorResponse = resp => {
  throw resp;
};
const qs = params =>
  !_.isEmpty(params) ? `?${queryString.stringify(params)}` : "";

const processResponse = async resp => {
  const body = await resp.json();

  /* temporary fix for mockapi.io data used on canopy-hq /branch-properties
     and canopy-hq /main-page/branches
     which has no `body.data`
  */
  if (!body.data) {
    return resp.ok ? body : throwErrorResponse(body);
  }

  return resp.ok && body.success ? body.data : throwErrorResponse(body.error);
};

export const get = async (url, params = {}) => {
  const response = await fetch(`${baseUrl}${url}${qs(params)}`, {
    ...opts(),
    method: "GET",
  }).catch(fetchError);

  return processResponse(response);
};

export const post = async (url, body = {}) => {
  const fetchOpts = {
    ...opts(),
    method: "POST",
    body: JSON.stringify(body),
  };
  const response = await fetch(`${baseUrl}${url}`, fetchOpts).catch(err => {
    fetchError(err);
  });

  return processResponse(response);
};

export const put = async (url, body = {}) => {
  const response = await fetch(`${baseUrl}${url}`, {
    ...opts(),
    method: "PUT",
    body: JSON.stringify(body),
  }).catch(fetchError);

  return processResponse(response);
};

export const del = async (url, body = {}) => {
  const response = await fetch(`${baseUrl}${url}`, {
    ...opts(),
    method: "DELETE",
    body: JSON.stringify(body),
  }).catch(fetchError);

  return processResponse(response);
};

export const postFile = async (url, body = {}) => {
  const formData = new FormData();
  Object.keys(body).forEach(b => {
    formData.append(b, body[b]);
  });
  await fetch(url, {
    ...amznOpts(),
    method: "POST",
    body: formData,
  }).catch(fetchError);
  // amazon response has no body, so just Resolve

  return Promise.resolve();
};
