import {isRequired} from "../utils/validators/common";
import {isValidEmail} from "../utils/validators/email";

export default {
  next: "/address-added",
  progress: 75,
  type: "object",
  skippable: true,
  title: "Request an agent/landlord reference?",
  header: "Request an agent/landlord reference?",
  info:
    "This strengthens your profile when applying for a property and will only be seen by the agent and lanlord",
  buttonText: "Request Reference",
  properties: {
    landlordFirstName: {
      type: "string",
      title: "First Name",
      validations: [isRequired],
    },
    landlordLastName: {
      type: "string",
      title: "Last Name",
      validations: [isRequired],
    },
    landlordEmail: {
      type: "string",
      title: "Email",
      validations: [isRequired, isValidEmail],
    },
  },
};
