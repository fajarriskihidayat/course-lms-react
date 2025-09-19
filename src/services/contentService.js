import { apiInstanceAuth } from "../utils/axios";

export const getContentDetail = async (id) =>
  await apiInstanceAuth.get(`/courses/contents/${id}`).then((res) => res.data);

export const createContent = async (data) =>
  await apiInstanceAuth.post("/courses/contents", data).then((res) => res.data);

export const updateContent = async (id, data) =>
  await apiInstanceAuth
    .put(`/courses/contents/${id}`, data)
    .then((res) => res.data);

export const deleteContent = async (id) =>
  await apiInstanceAuth
    .delete(`/courses/contents/${id}`)
    .then((res) => res.data);
