import axiosBase from 'axios'
import {
    Recipe,
    QueryParamRecipes,
    ResponseRecipes,
    QueryParamSearchRecipes,
} from '../types'
import { API_KEY, API_URL } from './env'

// set request header
const axios = axiosBase.create({
    baseURL: API_URL,
    headers: { 'X-Api-Key': API_KEY },
})

export const getRecipes = async (page?: number, id?: string) => {
    const params: QueryParamRecipes = { page, id }
    const res = await axios.get('/recipes', { params })
    const data = res.data as ResponseRecipes
    return data
}

export const getRecipe = async (id: number) => {
    const res = await axios.get(`/recipes/${id}`)
    const data = res.data as Recipe
    return data
}

export const searchRecipes = async (keyword: string, page?: number) => {
    const params: QueryParamSearchRecipes = { keyword, page }
    const res = await axios.get('/search', { params })
    const data = res.data as ResponseRecipes
    return data
}
