import {get, post, put, del} from "./api";

export const getPost = queries => get("/testUrl/1", queries);

export const postPost = (id, body) => post(`/testUrl/${id}`, body);

export const putPost = (id, body) => put(`/testUrl/${id}`, body);

export const deletePost = (id, body) => del(`/testUrl/${id}`, body);
