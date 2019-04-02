import {isRequired} from "../utils/validators/common";
import {isValidEmail} from "../utils/validators/email";

export default {
  theme: "dark",
  next: "/next",
  progress: 75,
  type: "object",
  skippable: false,
  title: "Request an employer reference?",
  header: "Request an employer reference?",
  info:
    "This strengthens your profile when applying for a property and will only be seen by the agent and lanlord",
  buttonText: "Request Reference",
  properties: {
    employerFirstName: {
      type: "string",
      title: "First Name",
      validations: [isRequired],
      autoFocus: true,
    },
    employerLastName: {
      type: "string",
      title: "Last Name",
      validations: [isRequired],
    },
    employerEmail: {
      type: "string",
      title: "Email",
      validations: [isRequired, isValidEmail],
    },
    employmentPosition: {
      type: "string",
      title: "Position at company",
      validations: [isRequired],
    },
  },
};
