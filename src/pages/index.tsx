import React, { useEffect, useState } from "react";
import * as api from "../api/recipes";
import { Recipe } from "../types";
import {NextPage} from "next"
import Header from "../components/header"

const SearchPage: NextPage = () => {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  useEffect(() => {
    const getRecipes = async () => {
      const data = await api.getRecipes();
      return data;
    };
    getRecipes()
      .then((data) => {
        const {recipes} = data
        setRecipes(recipes)
      })
      .catch((err: any) => {});
  });
  return <div><Header />{recipes && <div>{recipes.map((recipe) => {
    return (
      <div>
        
      <a href={`recipes/${recipe.id}`}>{recipe.title}</a>
      </div>
    )
  })}</div>}</div>;
};

export default SearchPage;
