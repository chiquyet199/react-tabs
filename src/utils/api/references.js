import {post, get} from "./api";

export const getReferenceById = rid => get(`/references/${rid}`);

export const submitReference = ({id, type, data}) =>
  post(`/references/${id}/${type}`, data);

export const getAWSBucketInfo = requestId =>
  post(`/references/${requestId}/newDocument`);
