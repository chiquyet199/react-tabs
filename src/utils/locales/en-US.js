import React from "react";
import styled from "styled-components/native";

export const Content = styled.View``;

export const Text = styled.Text`
  margin-top: 0;
  margin-bottom: 10px;
`;

module.exports = {
  home__welcome: "Welcome to RNW starter app",
  home__loggedin: "You are now logged in",
  login__email__label: "Email address",
  login__password__label: "Password",
  login__email__placeholder: "example@example.com",
  login__password__placeholder: "******",
  login__continue__with__facebook: "Continue with Facebook",
  login: "Sign in",
  create__account: "Create account",
  login__forgot__password: "Forgot password",
  login_problem_recovering_last_session: "Problem recovering last session",
  logout: "Logout",
  back: "Back",
  submit: "Submit",
  accept: "Accept",
  decline: "Decline",
  skip: "Skip",
  forgotPassport: "Forgot Password?",
  rent_passport: "Rent Passport",
  deposit_free: "Deposit Free",
  home_management: "Home Management",
  not_now: "Not now",
  authorize: "Authorize",
  terms_header: "Canopy terms & conditions",
  terms:
    "1. INTRODUCTION\n\n" +
    "By signing up for an account with Canopy, you are agreeing to be bound by the following terms and conditions (“Terms of Service”). These Terms of Service are to be read in conjunction with:\n\n" +
    "our Privacy Policy, which sets out the terms on which we process any personal data we collect from you, or that you or others provide to us; and\n\n" +
    "our Cookies Policy, which sets out information about the cookies we use.\n\n" +
    "These Terms of Service are important. Please read them carefully as they contain details of our statutory and regulatory responsibilities to you, and your contractual obligations to us. They also set out the basis on which we provide, and you are permitted to use, the various services made available on the website www.findyourcanopy.com and the mobile application known as ‘Canopy’ (together, the “Platform”), including the following:",
  verify__email__title__text: "Verify your email address",
  verifyEmail_tap_link: "Tap the link in that email to continue.",
  emailSentTo: "We sent an email to",
  verify__email__text:
    "We need to know you are you before creating a " +
    "RentPassport. Please click the link in the email we sent you.",
  open__email__client: "Open my email client",
  resend__verification__email: "Resend verification email",
  not__received__an__email: "Not received an email?",
  VerifyEmailSuccess: {
    email_successfully__verified: "Email successfully verified!",
    thanks__for__verifying:
      "Thanks for verifying. You can now continue creating your Canopy HQ account.",
    go__to: "Go to my Branch",
  },
  forgot_password: "Forgot your password?",
  reset_password: "Change your password",
  file_uploaded: "File uploaded",
  rent_passport_shared_success:
    "Rent passport has been shared for this property",
  tenant_reference_request: "Tenant reference request",
  upload_reference_document: "Upload reference document",
  complete_reference_form: "Complete reference form",
  complete_reference_form_description:
    ", tenant of yours, has authorised us to request a reference from you.\n" +
    "As you know a landlord reference is significant information when determining eligibility of a prospective tenant, so please consider the questions below carefully and feel free to make additional comments.",
  complete_reference_form_a: ", a ",
  multiSwitchError: "Please select at least one of the options.",
  passwordForgetAndReset: {
    forgotPassword: {
      heading: "Forgot your password?",
      enterEmail: "Enter your email to find your account",
      emailAddress: "Email address",
      we_sent_email_to: "We sent an email to",
      tap_to_reset_password:
        "Tap the link in that email to reset your password.",
    },
    resetPassword: {
      heading: "Change your password",
      passwordRules:
        "Your password must include one symbol and be 8 or more characters long",
      newPassword: "New Password",
      confirmPassword: "Confirm Password",
      passwordChanged: "Password changed.",
    },
  },
  signUp: {
    schema: {
      name: {
        header: "What's your name?",
        firstName: "First Name",
        lastName: "Last Name",
      },
      email: {
        header: "What's your email?",
        emailAddress: "Email address",
        marketing:
          "I'd like to receive occasional marketing emails from Canopy and our carefully selected partners.",
      },
      password: {
        header: "Create a password",
        title:
          "Your password must include one symbol and be 8 or more characters long",
        password: "Password",
      },
    },
  },
  createRentPassport: {
    schema: {
      name: {
        header: "What's your full name?",
        info: "Including your middle name(s)",
        firstName: "First Name",
        middleName: "Middle Name(s)",
        lastName: "Last Name",
        btnText: "Confirm full name",
      },
      about: {
        header: "Tell us about you",
        btnText: "Confirm details",
        gender: "Gender",
        male: "Male",
        female: "Female",
        other: "Other",
        married: "Married",
        single: "Single",
        civil_union: "Civil Union",
        birthday: "Birthday",
        maritalStatus: "Marital status",
        phone: "Phone number",
        nationality: "Nationality",
      },
      rental: {
        header: "What are your rental preferences?",
        btnText: "Confirm preferences",
        smoker: "I am a smoker",
        pets: "I have pets that live with me",
        children: "I have children under the age of 16 that live with me",
      },
    },
  },
  whatIsARentPassport_modal_content: {
    title: "What is a RentPassport?",
    subTitle:
      "A RentPassport is an instant digital profile created through our Android / iOS apps or our web portal.",
    text: (
      <Content>
        <Text>
          We carry out all the referencing checks as done by an agent,
          including: a credit check, ID verification and Right to Rent.
        </Text>
        <Text>
          You are in full control of your RentPassport and your data, you can
          share your RentPassport with whomever you wish.
        </Text>
        <Text>
          Once completed your RentPassport will give you a TrustScore giving you
          access to Rent Tracking and Deposit Free Renting with our ever-growing
          community of agents.
        </Text>
      </Content>
    ),
  },
  whatIsOpenBanking_modal_content: {
    title: "What is Open Banking?",
    subTitle:
      "Open Banking is the secure way to give providers access to your financial information.",
    text:
      "It opens the way to new products and services that could help customers and small to medium-sized businesses get a better deal. It could also give you a more detailed understanding" +
      " of your accounts, and help you find new ways to make the most of your money.\n\nGet ready for a world of apps and websites, where you can choose new financial products and services from providers" +
      " regulated by the Financial Conduct Authority (FCA) and European equivalents.\n\nIt works with online or mobile banking.",
  },
  upload_tenant_reference_document: "Upload tenant reference document",
  upload_tenant_reference_document_description:
    "If you have a manual form you usually use, please upload it here.",
  upload: "Upload",
  submit_reference: "Submit reference",
  tenant_reference_submitted: "Reference submitted",
  tenant_reference_thanks_for_time:
    "Thanks for taking the time to submit a tenant reference for",
  tenant_reference_did_you_know:
    "Did you know that Canopy offers the following property management tools to tenants, landlords and agents:",
  tenant_reference_rent_passport_text:
    "Full tenant referencing and property management including deposits and payments",
  tenant_reference_deposit_free_text:
    "Qualified tenants can pay a premium to cover their rental security deposit",
  tenant_reference_home_management_text:
    "With a valid UK Open Banking account, tenants are able to have rent payments contribute to their Experian credit report",
  find_out_more: "Find out more",
  create_rent_passport_fullName_header: "What’s your full name?",
  create_rent_passport_fullName_subTitle: "Including your middle name(s)",
  create_rent_passport_fullName_submitText: "Confirm full name",
  create_rent_passport_Details_header: "Tell us about you",
  create_rent_passport_Details_male: "Male",
  create_rent_passport_Details_female: "Female",
  create_rent_passport_Details_other: "Other",
  create_rent_passport_preferences_header: "What are your rental preferences?",
  create_rent_passport_preferences_submitText: "Confirm preferences",
  create_rent_passport_complete_proceed: "Where you've lived",
  create_rent_passport_complete_about_complete: "About you complete!",
  create_rent_passport_complete_first_step:
    "You’ve completed the first step to a world class Rent Passport.",
  create_rent_passport_complete_adding_address:
    "Up next is adding your current address.",
  postcode_lookup: {
    postcode: "Postcode",
    find_address: "Find address",
    address_not_listed: "Address not listed",
  },
  tenant_reference_title: "Tenant reference request",
  generating_rent_passport_title:
    "Sit tight, your Rent Passport is being created",
  generating_rent_passport_sub_title:
    "This is your personal Rent Passport, which can be shared with letting agents and landlords.",
  generating_rent_passport_action: "Rent Passport not updating?",
  upload_employer_reference_document: "Upload employer reference document",
  upload_employer_reference_document_description:
    "If you have a manual form you usually use, please upload it here.",
  crain: {
    crain_header: "Credit Reference Agency Information Notice (CRAIN)",
    crain_version: "Version: 1 Adopted: 23rd October 2017",
    crain_bold_text:
      "NOTE: The information in this document will be effective from the Adopted Date set out above, except for the information in Sections 9, (data portability right), 11 and 12. These Sections provide information on new rights that will only come into effect from the 25th May 2018, which is the effective date of the General Data Protection Regulation (or the GDPR).",
    crain_text:
      "This document describes how the three main credit reference agencies Callcredit, Equifax and Experian, (also called “credit reference agencies” or “CRAs” in this document) each use and share personal data (also called ‘bureau data’) they receive about you and/or your business that is part of or derived from or used in credit activity. \n\n" +
      "Please note: you shouldn’t think of this document as a complete record of all the personal data each CRA may hold and process, as each has a number of different business functions running through it. To find out more about each CRA’s other businesses, services and personal data processing, go to the website links provided at Section 14 below.",
  },
  address_journey: {
    add_address_manually: "Add address manually",
    currently_live_header: "Where do you currently live?",
    previously_live_header: "Where did you used to live?",
    current_living_situation_header: "What is your living situation?",
    previous_living_situation_header: "What was your living situation?",
  },
  truelayer: {
    truelayer_auth_title: "Truelayer Authorize",
  },
  employer_reference_form_description:
    " has advised us that you are their employer and has authorised us to request a reference from you.\n" +
    "As you know an employment reference is significant information when determining eligibility of a prospective tenant, so please consider the questions below carefully and feel free to make additional comments.",
  populating_rent_passport: {
    populating_rent_passport: "We’re currently populating your Rent Passport…",
    rent_passport_benefits_description:
      "This will speed up your rental journey and make sure you have the most accurate referencing data.",
    open_banking_not_updating: "Open Banking not updating?",
    rent_passport_populated: "Rent Passport successfully populated!",
    rent_passport_populated_description:
      "Your Rent Passport has been pre-populated as much as possible through your banking data.\n" +
      "Please continue and review the information to ensure it is correct.",
    continue_to_rent_passport: "Continue to my Rent Passport",
    open_banking_failed: "Open Banking access failed.\nIt's not you, it's us.",
    open_banking_failed_description:
      "You can always start your Rent Passport  manually and try linking later.",
    start_my_rent_passport: "Start my Rent Passport",
  },
  RentalHistoryComplete: {
    false: {
      // not complete - need to add more addresses
      page__title: "Current address added!",
      info:
        "We need at least 3 years of address history to validate your identity ith Experian",
      button__text: "Add previous address",
    },
    true: {
      page__title: "Current address added!",
      info:
        "Your passport is enhanced with a clear address history and qualified references.",
      button__text__continue: "What you do",
      button__text__not__now: "Not now",
    },
  },
  credit_score_label: "Credit Score",
  credit_score_out_of: "out of",
  topbar: {
    topbarBackButtonText: "Back",
  },
  UKAddressEntry: {
    confirm: "Confirm",
    chooseAnother: "Choose Another",
  },
  rent_passport_complete: {
    none: "None",
    yes: "Yes",
    no: "No",
    errors: {
      // packages/canopy-frontend-common/src/utils/helpers/rentPassport:179 - creates proper key name w/o dot notation in strings
      unverified: {
        text: "We can't verify your information",
        action: "Contact support",
      },
      dateOfBirth_unverified: {
        text: "We can't verify your date of birth",
        action: "Contact support",
      },
      nationality_unverified: {
        text: "We can't verify your nationality",
        action: "Contact support",
      },
      name_unverified: {
        text: "We can't verify your identity",
        action: "Contact support",
      },
      pendingReference: {
        text: "No landlord/agent reference received",
        action: "Reference request pending",
      },
      pendingEmployerReference: {
        text: "No employer reference received",
        action: "Reference request pending",
      },
      requestReference: {
        text: "No employer reference received",
        action: "Request reference",
      },
      sourcesOfIncome_unverified: {
        text: "Income not verified",
        action: "Verify income",
      },
      pendingSourcesOfIncome: {
        text: "Income not verified",
        action: "Income verification pending",
      },
      finance_grossAnnualIncome_pendingManualVerification: {
        text: "Annual income not verified",
        action: "Verify income",
      },
      grossAnnualIncome_unverified: {
        text: "Annual income not verified",
        action: "Verify income",
      },
      watchList_politicallyExposedPerson_failed: {
        text: "Politically exposed person",
        action: "Contact support",
      },
      identity_mortality_failed: {
        text: "Failed mortality",
        action: "Contact support",
      },
      watchList_legalAndRegulatoryWarnings_failed: {
        text: "Legal warnings",
        action: "Contact support",
      },
      watchList_sanction_failed: {
        text: "Sanctions",
        action: "Contact support",
      },
      paidWork_unverified: {
        text: "Not in paid work right now",
        action: "Renting with a guarantor",
      },
      credit_countyCourtJudgments_failed: {
        text: "Active CCJs",
        action: "Renting with a guarantor",
      },
      credit_insolvency_failed: {
        text: "Active insolvency",
        action: "Renting with a guarantor",
      },
      credit_insolvency_status_failed: {
        text: "Insolvency status",
        action: "Renting with a guarantor",
      },
      previousInsolvencies_warning: {text: "Previous insolvency"},
      previousCCJs_warning: {text: "Previous CCJ"},
      credit_numberOfBankruptcies_failed: {
        text: "Bankrupt",
        action: "Renting with a guarantor",
      },
      creditScore_failed: {
        text: "Very poor credit score",
        action: "Renting with a guarantor",
      },
      Tenant_has_less_eligible_: {
        text: "Tenant has less eligible",
      },
      Tenant_is_smoker_: {
        text: "Tenant is smoker",
      },
      Tenant_has_pets_: {
        text: "Tenant has pets",
      },
      location_currentAddress_pendingManualVerification: {
        text: "Pending address verification",
        action: "Contact support",
      },
    },
    aboutYou: {
      name: "Name",
      login__email__label: "Email address",
      phone_number: "Phone number",
      gender: "Gender",
      marital_status: "Marital status",
      pets: "Pets",
      your_birthday: "Your birthday",
      smoker: "Smoker",
      children: "Children",
    },
    whereYouLived: {
      current_address: "Current address",
      address: "Address",
      residence_type: "Residence type",
      lived_here_since: "Lived here since",
      lived_here_to: "Lived here to",
      reference: "Reference",
      received: "received",
      not_received: "Not yet received",
    },
    whatYouDo: {
      what_you_do: "What you do",
      employment_type: "Employment Status",
      company_name: "Company name",
      job_title: "Job title",
      annual_salary: "Annual salary",
      annual_pension: "Annual pension",
      full_or_part_time: "Full or part time",
      permanent_or_contract: "Permanent or contract",
      worked_here_since: "Worked here since",
      student_type: "Student type",
      reference: "Reference",
      referee_position_at_company: "Referee position at company",
      received: "received",
      not_received: "Not yet received",
      not_in_paid_work: "Not in paid work",
    },
    financial: {
      available: "Available",
      unavailable: "Unavailable",
      total_annual_income: "Total annual income",
      sources_of_income: "Sources of income",
      deposit_free: "Deposit Free",
      maximum_eligible: "Maximum eligible",
      active_ccjss: "Active CCJs",
      previous_ccjss: "Previous CCJs",
      active_insolvencies: "Active Insolvencies",
      previous_insolvencies: "Previous Insolvencies",
      bankrupt: "Bankrupt",
    },
    rentPassportLegal: {
      pep: "PEP",
      mortality: "Mortality",
      legal_warnings: "Legal warnings",
      sanctions: "Sanctions",
      none: "None",
      passed: "Passed",
      failed: "Failed",
      living: "living",
    },
    rightToRentInfo: {
      status: "Status",
      failed: "Failed",
      verified: "Verified",
      rightToRent: "Right to rent ",
      uploadRight: "Please upload right to rent",
      pending: "pending",
      submitted: "submitted",
      pass: "verified",
      fail: "declined",
    },
  },
  rightToRent: {
    driving: "Driving License",
    biometric: "Biometric residence permit",
    passport: "Passport",
    cancel: "Cancel",
  },
  headerPropertySummary: {
    rentDueDate: "next due",
  },
  currency_symbol: "£",
  validationErrors: {
    onlyLetters: "Invalid Input",
    required: "Required",
    selectAtLeastOne: "Please select at least one option",
    invalidEmail: "Invalid Email Address",
    emailTaken: "An account with this email address already exists",
    onlyNumbers: "Only numbers",
    invalidNumber: "Invalid number",
    invalidPassword: "Invalid password",
    passwordsDontMatch: "Passwords don't match",
    invalidPhoneNumber: "Please enter a valid phone number",
  },
  tenancyTerms: {
    additionalInfoTitle: "Additional information",
    ongoing: "ongoing",
    subTitle: "View the terms of your tenancy",
    termTitle: "Term",
    title: "Tenancy terms",
    totalRentTitle: "Total rent",
    tenancyPeriodAbbreviations: {
      WEEKLY: "pw",
      FORTNIGHTLY: "p2w",
      FOUR_WEEKLY: "p4w",
      MONTHLY: "pcm",
      YEARLY: "pa",
    },
  },
  depositFree: {
    subTitle: "Manage deposit insurance documents",
    title: "Deposit Free",
    documentTypes: {
      POLICY_SCHEDULE: "Policy Schedule",
      STATEMENT_OF_FACTS: "Statement of Facts",
      POLICY_WORDING: "Policy Wording",
      INSURANCE_PRODUCT_INFORMATION_DOCUMENT:
        "Insurance Product Information Document",
      INSURANCE_SERVICE_INFORMATION_DOCUMENT:
        "Insurance Service Information Document",
      AST: "Assured Short-Term Tenancy",
    },
  },
  housemates: {
    title: "Housemates",
    subTitle: "Everyone who lives at this property",
  },
};
