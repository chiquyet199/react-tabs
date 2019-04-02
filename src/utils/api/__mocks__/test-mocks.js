import {baseUrl} from "../api";

export default [
  {
    url: `${baseUrl}/testUrl/1?key1=value1`,
    method: "GET",
    response: {
      success: true,
      requestId: "12345678-abcd-1234-abcd-123456789012",
      data: {value: "testGetValue"},
    },
    responseCode: 200,
  },
  {
    url: `${baseUrl}/testUrl/error?key1=value1`,
    method: "GET",
    response: {
      success: false,
      status: 500,
      requestId: "12345678-abcd-1234-abcd-123456789012",
      error: {value: "testGetError"},
    },
    responseCode: 500,
  },
  {
    url: `${baseUrl}/testUrl/1`,
    method: "POST",
    response: {
      success: true,
      requestId: "12345678-abcd-1234-abcd-123456789012",
      data: {value: "testPostValue"},
    },
    responseCode: 200,
  },
  {
    url: `${baseUrl}/testUrl/error`,
    method: "POST",
    response: {
      success: false,
      status: 404,
      requestId: "12345678-abcd-1234-abcd-123456789012",
      error: {value: "testPostError"},
    },
    responseCode: 404,
  },
  {
    url: `${baseUrl}/testUrl/1`,
    method: "PUT",
    response: {
      success: true,
      requestId: "12345678-abcd-1234-abcd-123456789012",
      data: {value: "testPutValue"},
    },
    responseCode: 200,
  },
  {
    url: `${baseUrl}/testUrl/error`,
    method: "PUT",
    response: {
      success: false,
      status: 503,
      requestId: "12345678-abcd-1234-abcd-123456789012",
      error: {value: "testPutError"},
    },
    responseCode: 503,
  },
  {
    url: `${baseUrl}/testUrl/1`,
    method: "DELETE",
    response: {
      success: true,
      requestId: "12345678-abcd-1234-abcd-123456789012",
      data: {value: "testDeleteValue"},
    },
    responseCode: 200,
  },
  {
    url: `${baseUrl}/testUrl/error`,
    method: "DELETE",
    response: {
      success: false,
      status: 500,
      requestId: "12345678-abcd-1234-abcd-123456789012",
      error: {value: "testDeleteError"},
    },
    responseCode: 500,
  },
  {
    url: `${baseUrl}/signup/confirm`,
    method: "POST",
    response: {
      success: true,
      requestId: "12345678-abcd-1234-abcd-123456789012",
      error: {success: true, user: "testUser"},
    },
    responseCode: 200,
  },
];
