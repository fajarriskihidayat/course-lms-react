import { apiInstanceAuth } from "../utils/axios";

export const getCategories = async () =>
  apiInstanceAuth.get("/categories").then((res) => res.data);
