import React, { useEffect, useState } from "react";
import * as api from "../api/recipes";
import type { Recipe } from "../types";
import {NextPage} from "next"

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
  return <div>{recipes && <div>{JSON.stringify(recipes)}</div>}</div>;
};

export default SearchPage;
