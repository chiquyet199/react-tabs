import {baseUrl} from "../api";

export default {
  default: [
    {
      url: `${baseUrl}/signup/email`,
      method: "POST",
      response: {
        id: "fe905025-1dcd-4130-8e2a-aa135e135ae7",
        type: "USER",
        email: "matthew.jones@findyourcanopy.com",
        firstName: "Matt",
        middleName: null,
        lastName: "Jones",
        phone: null,
        dob: null,
        language: "en",
      },
      responseCode: 201,
    },
    {
      url: `${baseUrl}/users?email=jo%40canopy.rent`,
      method: "GET",
      response: {},
      responseCode: 200,
    },
    {
      url: `${baseUrl}/user/password/reset`,
      method: "POST",
      response: {},
      responseCode: 200,
    },
  ],
  failedSignup: [
    {
      url: `${baseUrl}/users?email=jo%40canopy.rent`,
      method: "GET",
      response: {},
      responseCode: 200,
    },
    {
      url: `${baseUrl}/signup/email`,
      method: "POST",
      response: {
        error: "something bad happened",
      },
      responseCode: 500,
    },
  ],
  takenEmail: [
    {
      url: `${baseUrl}/users?email=jo%40canopy.rent`,
      method: "GET",
      responseCode: 200,
    },
  ],
  failedToSendResetToken: [
    {
      url: `${baseUrl}/user/password/reset`,
      method: "POST",
      response: {error: "Could not send password reset email"},
      responseCode: 500,
    },
  ],
};
