import axiosBase from "axios";
import {  QueryParamRecipes, ResponseRecipes } from "../types";
import {API_KEY,API_URL} from "./env"

// set request header
const axios = axiosBase.create({
  baseURL: API_URL,
  headers: { "X-Api-Key":API_KEY},
});

export const getRecipes = async (page?: number, id?: string) => {
  const params: QueryParamRecipes = { page, id };
  const res = await axios.get("/recipes", { params });
  const data = res.data as ResponseRecipes;
  return data;
};
