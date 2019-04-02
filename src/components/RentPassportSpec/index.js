import {oneOf, arrayOf, number, bool, shape, string} from "prop-types";

export default shape({
  userId: string,
  status: oneOf(["PENDING", "SUBMITTED", "INCOMPLETE", "COMPLETE"]),
  aboutInfo: shape({
    email: string.isRequired,
    firstName: string.isRequired,
    lastName: string.isRequired,
    middleName: string,
    gender: oneOf(["MALE", "FEMALE", "UNKNOWN", "OTHER"]),
    dayOfBirth: number.isRequired,
    monthOfBirth: number.isRequired,
    yearOfBirth: number.isRequired,
    maritalStatus: oneOf([
      "SINGLE",
      "MARRIED",
      "WIDOWED",
      "DIVORCED",
      "SEPARATED",
      "REGISTERED_PARTNERSHIP",
      "CIVIL_UNION",
    ]),
    phoneNumber: string.isRequired,
    nationality: string.isRequired,
    isSmoker: bool.isRequired,
    hasPets: bool.isRequired,
    hasChildren: bool.isRequired,
    status: oneOf(["GREEN", "YELLOW", "RED", "NONE"]),
    messages: arrayOf(string),
  }),
  annualIncomeInfo: shape({
    salary: number,
    pension: number,
    interest: number,
    benefits: number,
    rentals: number,
    other: number,
    grossAnnualIncome: number,
    sourcesOfIncome: arrayOf(string),
    status: oneOf(["GREEN", "YELLOW", "RED", "NONE"]),
    messages: arrayOf(string),
  }),
  financialInfo: shape({
    bankrupt: bool.isRequired,
    creditScore: number.isRequired,
    depositFree: bool.isRequired,
    maximumEligible: number.isRequired,
    activeCCJs: number,
    activeCCJYear: number,
    activeCCJMonth: number,
    activeCCJValue: number,
    previousCCJs: number,
    previousCCJsYear: number,
    previousCCJsMonth: number,
    activeInsolvencies: number,
    activeInsolvenciesYear: number,
    activeInsolvenciesMonth: number,
    previousInsolvencies: bool.isRequired,
    previousInsolvenciesYear: number,
    previousInsolvenciesMonth: number,
    status: oneOf(["GREEN", "YELLOW", "RED", "NONE"]),
    messages: arrayOf(string),
  }),
  legalInfo: shape({
    pep: bool,
    mortality: oneOf(["passed", "living", "failed"]),
    legalWarnings: bool.isRequired,
    sanctions: bool.isRequired,
    status: oneOf(["GREEN", "YELLOW", "RED", "NONE"]),
    messages: arrayOf(string),
  }),
  workInfo: arrayOf(
    shape({
      workStatus: oneOf([
        "EMPLOYED",
        "SELF_EMPLOYED",
        "RETIRED",
        "STUDENT",
        "NOT_WORK",
      ]).isRequired,
      companyName: string,
      jobTitle: string,
      income: number,
      employmentTime: oneOf(["FULL_TIME", "PART_TIME"]),
      employmentType: oneOf(["CONTRACT", "PERMANENT"]),
      workedSinceMonth: number,
      workedSinceYear: number,
      studentType: oneOf([
        "POST_GRADUATE_STUDENT",
        "UNDERGRADUATE_STUDENT",
        "COLLEGE_STUDENT",
      ]),
      reference: shape({
        contactFirstName: string.isRequired,
        contactLastName: string.isRequired,
        contactEmailAddress: string.isRequired,
        referredAt: string,
      }),
      status: oneOf(["GREEN", "YELLOW", "RED", "NONE"]),
      messages: arrayOf(string),
    }),
  ),
  residenceInfo: arrayOf(
    shape({
      line1: string,
      town: string,
      state: string,
      postCode: string,
      countryCode: string,
      residenceType: oneOf([
        "RENTING_FROM_AGENT",
        "PRIVATE_RENTAL",
        "PROPERTY_OWNER",
        "WITH_PARENTS",
      ]),
      reference: shape({
        contactFirstName: string.isRequired,
        contactLastName: string.isRequired,
        contactEmailAddress: string.isRequired,
        referredAt: string,
      }),
      livedSinceMonth: number.isRequired,
      livedSinceYear: number.isRequired,
      livedToMonth: oneOf([number, null]),
      livedToYear: oneOf([number, null]),
      status: oneOf(["GREEN", "YELLOW", "RED", "NONE"]),
      messages: arrayOf(string),
    }),
  ),
});
