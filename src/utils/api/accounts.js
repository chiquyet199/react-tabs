import {post, get} from "./api";

export const createHqAccount = values => post("/agency/create", values);

export const updateAgency = values => post("/agency/update", values);

export const getInitialSettingsValues = () => get("/agency/get");
