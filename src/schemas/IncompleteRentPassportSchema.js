import profile from "../assets/profile.png";
import employment from "../assets/employment.png";
import property from "../assets/property.png";

export default {
  header: "Rent Passport",
  greeting: "Hello,",
  info:
    "Create a Rent Passport once and you're ready to rent from any Canopy agent or landlord",
  linkText: "What is a Rent Passport?",
  button: {type: "primary", text: "Start my Rent Passport"},
  listItems: [
    {
      title: "About you",
      infoText: "Full name, birthday and rental preferences",
      icons: {main: profile, complete: "tick-circle", incomplete: "error"},
      statusText: {complete: "Complete", incomplete: "Incomplete"},
    },
    {
      title: "Where you've lived",
      infoText: "Last 3 years of addresses & references",
      icons: {main: property, complete: "tick-circle", incomplete: "error"},
      statusText: {complete: "Complete", incomplete: "Incomplete"},
    },
    {
      title: "What you do",
      infoText: "Current occupation, salary & references",
      icons: {main: employment, complete: "tick-circle", incomplete: "error"},
      statusText: {complete: "Complete", incomplete: "Incomplete"},
    },
  ],
};
