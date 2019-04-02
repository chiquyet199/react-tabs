import {STORE_INITIAL_VALUES} from "./types";
import {errorNotification} from "./notifications";
import API from "../utils/api";

export const updateAgency = ({values}) => async dispatch => {
  await API.updateAgency(values).catch(({error}) =>
    dispatch(errorNotification(error)),
  );
};

export const getInitialValues = () => async dispatch => {
  const initialValues = await API.getInitialSettingsValues().catch(({error}) =>
    dispatch(errorNotification(error)),
  );

  if (initialValues) {
    storeValues(initialValues.values);
  }
};

export const storeValues = values => ({
  type: STORE_INITIAL_VALUES,
  values,
});
