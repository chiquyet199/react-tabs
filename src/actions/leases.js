import API from "../utils/api";
import {errorNotification} from "./notifications";
import {push} from "connected-react-router";
import {LEASES_LOOKUP_RESULT, GET_PROPERTY_ACTIVE_LEASE} from "./types";

export const leasesLookupResult = value => ({
  type: LEASES_LOOKUP_RESULT,
  value,
});

export const getPropertyActiveLease = value => ({
  type: GET_PROPERTY_ACTIVE_LEASE,
  value,
});

export const sendLeaseRequest = formData => async dispatch => {
  const invitation = await API.inviteToLease(formData).catch(({error}) =>
    dispatch(errorNotification(error)),
  );

  if (invitation) {
    dispatch(push("/invited-to-rent"));
  }
};

export const findLeaseByRenter = renterID => async dispatch => {
  try {
    const leases = await API.findLeaseByRenter(renterID);
    dispatch(leasesLookupResult(leases));
  } catch (error) {
    dispatch(errorNotification(error));
  }
};

export const findLeaseByProperty = propertyID => async dispatch => {
  try {
    const lease = await API.findLeaseByProperty(propertyID);
    dispatch(getPropertyActiveLease(lease));
  } catch (error) {
    dispatch(errorNotification(error));
  }
};
