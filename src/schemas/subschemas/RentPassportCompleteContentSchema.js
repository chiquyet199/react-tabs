import React from "react";
import styled from "styled-components/native";
import {isEmpty} from "underscore";
import {makeString, formatMoney} from "../../utils/string";
import moment from "moment";

export const TextWrapper = styled.View`
  width: 100%;
  padding-right: 10px;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;
export const Text = styled.Text`
  font-size: ${({fontSize}) => fontSize || "18"}px;
  font-style: ${({fontStyle}) => fontStyle || "normal"};
  color: ${({error, theme}) =>
    error === "true" ? theme.colors.alertRed : theme.colors.canopySteel};
  align-self: flex-end;
`;

const getFormattedDate = (year, month, day) => {
  if (day === undefined) {
    const fDate = moment(`1/${month}/${year}`, "D/M/YYYY");

    return fDate.format("MM.YYYY");
  }

  const fDate = moment(`${day}/${month}/${year}`, "D/M/YYYY");

  return fDate.format("DD.MM.YYYY");
};

export const RentPassportCompleteContentSchema = (
  componentName,
  rentPassport,
  translations,
) => {
  const component = rentPassport[componentName];
  const strings = translations[componentName];

  if (!isEmpty(component)) {
    return {
      aboutYou: {
        properties: () => [
          {
            name: {
              title: strings.name,
              value: `${component.firstName ? component.firstName : ""} ${
                component.middleName ? component.middleName : ""
              } ${component.lastName ? component.lastName : ""}`,
              width: 100,
              error: component.messages.includes("name.unverified"),
            },
            email: {
              title: strings.login__email__label,
              value: component.email,
              width: 100,
            },
            phoneNumber: {
              title: strings.phone_number,
              value: component.phoneNumber,
              width: 100,
            },
            gender: {
              title: strings.gender,
              value: component.gender && makeString(component.gender),
              width: 50,
            },
            dateOfBirth: {
              title: strings.your_birthday,
              value: getFormattedDate(
                component.yearOfBirth,
                component.monthOfBirth,
                component.dayOfBirth,
              ),
              width: 50,
              error: component.messages.includes("dateOfBirth.unverified"),
            },
            maritalStatus: {
              title: strings.marital_status,
              value:
                component.maritalStatus && makeString(component.maritalStatus),
              width: 50,
            },
            isSmoker: {
              title: strings.smoker,
              value: component.isSmoker ? "Yes" : "No",
              width: 50,
            },
            hasPets: {
              title: strings.pets,
              value: component.hasPets ? "Yes" : "No",
              width: 50,
            },
            hasChildren: {
              title: strings.children,
              value: component.hasChildren ? "Yes" : "No",
              width: 50,
            },
          },
        ],
      },
      whereYouLived: {
        properties: () => {
          return component.residenceInfo.map(item => {
            return {
              currentAddress: {
                title: strings.address,
                value: [
                  item.line1,
                  item.line2,
                  item.town,
                  item.state,
                  item.postCode,
                ],
                width: 100,
              },
              residenceType: {
                title: strings.residence_type,
                value: item.residenceType && makeString(item.residenceType),
                width: 100,
              },
              livedHereSince: {
                title: strings.lived_here_since,
                value: `${getFormattedDate(
                  item.livedSinceYear,
                  item.livedSinceMonth,
                )}`,
                width: 50,
              },
              livedHereTo: {
                ...(item.livedToMonth &&
                  item.livedToYear && {
                    title: strings.lived_here_to,
                    value: `${getFormattedDate(
                      item.livedToYear,
                      item.livedToMonth,
                    )}`,
                  }),

                width: 50,
              },
              reference: {
                ...(item.reference && {
                  title: strings.reference,
                  value: `${item.reference.contactFirstName} ${
                    item.reference.contactLastName
                  }`,
                }),
                width: 50,
              },
              received: {
                ...(item.reference && {
                  title: null,
                  value: `${
                    item.reference && item.reference.referredAt
                      ? "received " +
                        moment(item.reference.referredAt).format("DD.MM.YYYY")
                      : strings.not_received
                  }`,
                }),
                width: 50,
              },
            };
          });
        },
      },
      whatYouDo: {
        properties: () => {
          return component.workInfo.map(item => {
            if (item.workStatus === "EMPLOYED") {
              return {
                whatYouDo: {
                  title: strings.what_you_do,
                  value: item.workStatus && makeString(item.workStatus),
                  width: 100,
                },
                companyName: {
                  title: strings.company_name,
                  value: item.companyName,
                  width: 100,
                },
                jobTitle: {
                  title: strings.job_title,
                  value: item.jobTitle,
                  width: 100,
                },
                annualSalary: {
                  title: strings.annual_salary,
                  value:
                    item.income &&
                    `${formatMoney(item.income, translations.currency_symbol)}`,
                  width: 50,
                },
                fullOrPartTime: {
                  title: strings.full_or_part_time,
                  value: item.employmentTime && makeString(item.employmentTime),
                  width: 50,
                },
                permanentOrContract: {
                  title: strings.permanent_or_contract,
                  value: item.employmentType && makeString(item.employmentType),
                  width: 50,
                },
                workedHereSince: {
                  title: strings.worked_here_since,
                  value: getFormattedDate(
                    item.workedSinceYear,
                    item.workedSinceMonth,
                  ),
                  width: 50,
                },
                reference: {
                  ...(item.reference && {
                    title: strings.reference,
                    value: `${item.reference.contactFirstName} ${
                      item.reference.contactLastName
                    }`,
                  }),
                  width: 50,
                },
                received: {
                  ...(item.reference && {
                    title: null,
                    value: `${
                      item.reference.referredAt
                        ? "received " +
                          moment(item.reference.referredAt).format("DD.MM.YYYY")
                        : strings.not_received
                    }`,
                  }),
                  width: 50,
                },
                referee_position_at_company: {
                  ...(item.reference &&
                    item.reference.refereePosition && {
                      title: strings.referee_position_at_company,
                      value: `${item.reference.refereePosition}`,
                    }),
                  width: 100,
                },
              };
            } else if (item.workStatus === "STUDENT") {
              return {
                whatYouDo: {
                  title: strings.what_you_do,
                  value: item.workStatus && makeString(item.workStatus),
                  width: 100,
                },
                studentType: {
                  title: strings.student_type,
                  value: item.studentType && makeString(item.studentType),
                  width: 50,
                },
              };
            } else if (item.workStatus === "RETIRED") {
              return {
                whatYouDo: {
                  title: strings.what_you_do,
                  value: item.workStatus && makeString(item.workStatus),
                  width: 100,
                },
                annualSalary: {
                  title: strings.annual_pension,
                  value:
                    item.income &&
                    `${formatMoney(item.income, translations.currency_symbol)}`,
                  width: 50,
                },
              };
            } else if (item.workStatus === "NOT_WORK") {
              return {
                whatYouDo: {
                  title: strings.what_you_do,
                  value: strings.not_in_paid_work,
                  width: 100,
                },
              };
            }

            return {};
          });
        },
      },
      financial: {
        properties: () => [
          {
            totalAnnualIncome: {
              title: strings.total_annual_income,
              value: `${formatMoney(
                component.grossAnnualIncome ? component.grossAnnualIncome : 0,
                translations.currency_symbol,
              )}`,
              width: 50,
            },
            /* sourcesOfIncome: {
              title: strings.sources_of_income,
              value: component.sourcesOfIncome,
              width: 50,
            },
            depositFree: {
              title: strings.deposit_free,
              value: component.depositFree
                ? strings.available
                : strings.unavailable,
              width: 50,
            }, */
            /* maximumEligible: {
              title: strings.maximum_eligible,
              value: `${formatMoney(
                component.maximumEligible,
                translations.currency_symbol,
              )}`,
              width: 50,
            }, */
            activeCCJs: {
              title: strings.active_ccjss,
              value: component.activeCCJs ? (
                <TextWrapper>
                  <Text error={!!component.activeCCJs && "true"}>
                    {formatMoney(
                      component.activeCCJs,
                      translations.currency_symbol,
                    )}
                  </Text>
                  <Text
                    fontSize={12}
                    fontStyle="italic"
                    error={!!component.activeCCJs && "true"}
                  >
                    {component.activeCCJMonth}.{component.activeCCJYear}
                  </Text>
                </TextWrapper>
              ) : (
                translations.none
              ),
              width: 50,
              error: !!component.activeCCJs,
            },
            previousCCJs: {
              title: strings.previous_ccjss,
              value: component.previousCCJs ? (
                <TextWrapper>
                  <Text>
                    {formatMoney(
                      component.previousCCJs,
                      translations.currency_symbol,
                    )}
                  </Text>
                  <Text fontSize={12} fontStyle="italic">
                    {component.previousCCJsMonth}.{component.previousCCJsYear}
                  </Text>
                </TextWrapper>
              ) : (
                translations.none
              ),
              width: 50,
            },
            activeInsolvencies: {
              title: strings.active_insolvencies,
              value: component.activeInsolvencies ? (
                <TextWrapper>
                  <Text error={!!component.activeInsolvencies && "true"}>
                    {formatMoney(
                      component.activeInsolvencies,
                      translations.currency_symbol,
                    )}
                  </Text>
                  <Text
                    fontSize={12}
                    fontStyle="italic"
                    error={!!component.activeInsolvencies && "true"}
                  >
                    {component.activeInsolvenciesMonth}.
                    {component.activeInsolvenciesYear}
                  </Text>
                </TextWrapper>
              ) : (
                translations.none
              ),
              width: 50,
              error: !!component.activeInsolvencies,
            },
            previousInsolvencies: {
              title: strings.previous_insolvencies,
              value: component.previousInsolvencies ? (
                <TextWrapper>
                  <Text>
                    {formatMoney(
                      component.previousInsolvencies,
                      translations.currency_symbol,
                    )}
                  </Text>
                  <Text fontSize={12} fontStyle="italic">
                    {component.previousInsolvenciesMonth}.
                    {component.previousInsolvenciesYear}
                  </Text>
                </TextWrapper>
              ) : (
                translations.none
              ),
              width: 50,
            },
            bankrupt: {
              title: strings.bankrupt,
              value: component.bankrupt ? translations.yes : translations.no,
              width: 50,
              error: component.bankrupt,
            },
          },
        ],
      },
      rentPassportLegal: {
        properties: () => [
          {
            pep: {
              title: strings.pep,
              value: component.pep ? translations.no : translations.yes,
              width: 50,
              error: !component.pep,
            },
            mortality: {
              title: strings.mortality,
              value: component.mortality && makeString(component.mortality),
              width: 50,
              error: component.mortality === "failed",
            },
            legalWarnings: {
              title: strings.legal_warnings,
              value: component.legalWarnings
                ? translations.no
                : translations.yes,
              width: 50,
              error: !component.legalWarnings,
            },
            sanctions: {
              title: strings.sanctions,
              value: component.sanctions ? translations.no : translations.yes,
              width: 50,
              error: !component.sanctions,
            },
          },
        ],
      },
      rightToRentInfo: {
        properties: () => [
          {
            documentStatus: {
              title: strings.status,
              value: component.documentStatus,
              translations: strings,
              uiComponent: "rightToRentComponent",
              data: component,
              error: component.documentStatus === "failed",
            },
          },
        ],
      },
    };
  }

  return {};
};
