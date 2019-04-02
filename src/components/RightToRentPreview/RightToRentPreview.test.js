import React from "react";
import {shallow} from "enzyme";
import {RightToRentPreview} from "../RightToRentPreview";
import {StyledText, ScanningMetadata} from "./RightToRentPreview.styles";
import {extend} from "underscore";

describe("RightToRentPreview Tests", () => {
  describe("Snapshot", () => {
    it("matches snapshot", () => {
      expect(
        getComponent({passport: passportWithPhoto("PENDING")}),
      ).toMatchSnapshot();
    });

    it("renders correct status", () => {
      const statuses = ["PENDING", "SUBMITTED", "PASS", "FAIL"];
      const expectedText = [
        "Right to rent pending",
        "Right to rent submitted",
        "Right to rent verified",
        "Right to rent declined",
      ];

      for (let x = 0; x < statuses.length; x += 1) {
        const status = statuses[x];
        expect(
          getComponent({passport: passportWithPhoto(status)}).find(StyledText),
        ).toHaveProp("children", expectedText[x]);
      }
    });

    it("passes italic prop to StyledText when status is PENDING", () => {
      expect(
        getComponent({passport: passportWithPhoto("PENDING", "YELLOW")}).find(
          StyledText,
        ),
      ).toHaveProp("italic", true);
    });

    it("passes alert prop to StyledText when status is FAIL", () => {
      expect(
        getComponent({passport: passportWithPhoto("FAIL", "RED")}).find(
          StyledText,
        ),
      ).toHaveProp("alert", true);
    });

    it("Correctly renders photoUpload text", () => {
      expect(
        getComponent({
          passport: passportWithoutPhoto("PENDING", "YELLOW"),
        }).find(StyledText),
      ).toHaveProp("children", "Upload a photo");
    });

    it("requests name of seenBy id on mount", () => {
      const passport = passportWithPhoto("PENDING", "YELLOW");
      passport.data.seenBy = "abc-123-def-456";
      const getUser = jest.fn();
      getComponent({passport, getUser});
      expect(getUser).toHaveBeenCalledWith(passport.data.seenBy);
    });

    it("adds scanned by metadata when scannedByName prop is present", () => {
      const passport = passportWithPhoto("PENDING");
      const component = getComponent({passport});
      expect(component.find(ScanningMetadata)).not.toExist();
      component.setProps({
        scannedByName: "Becky Hammond",
      });
      component.update();
      expect(component.find(ScanningMetadata)).toHaveProp(
        "children",
        "Seen by Becky Hammond, 01.11.2018",
      );
    });
  });

  const getComponent = props => {
    const parsedProps = extend(
      {
        getUser: () => {},
        globaltheme: "light",
        passport: passportWithPhoto("PASS"),
        theme: {
          textColor: "black",
          errorColor: "orange",
        },
      },
      props,
    );

    return shallow(<RightToRentPreview {...parsedProps} />);
  };
});

const passportWithPhoto = (documentStatus, status = "GREEN") => ({
  data: {
    id: "abc-123",
    provider: "TRUST_ID",
    tenantId: "def-456",
    documentStatus,
    seenBy: "ghi-789",
    seenAt: "2018-11-01T12:37:00",
    status,
    documents: [
      {
        id: "mno-345",
        type: "PASSPORT",
        images: ["jkl-012"],
        expires: "2020-07-16T00:00:00",
      },
    ],
    messages: [],
  },
  translations: {
    rightToRent: "Right to rent ",
    uploadRight: "uploadRight",
    pending: "pending",
    submitted: "submitted",
    pass: "verified",
    fail: "declined",
    seenBy: "Seen by ",
  },
});

const passportWithoutPhoto = (documentStatus, status = "GREEN") => ({
  data: {
    id: "abc-123",
    provider: "TRUST_ID",
    tenantId: "def-456",
    documentStatus,
    seenBy: "ghi-789",
    seenAt: "2018-11-01T12:37:00",
    status,
    documents: [],
    messages: [],
  },
  translations: {
    rightToRent: "rightToRent",
    uploadRight: "Upload a photo",
    pending: "pending",
    submitted: "submitted",
    pass: "verified",
    fail: "declined",
    seenBy: "seenBy",
  },
});
