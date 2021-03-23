import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import type { Recipe } from "../../types";
import * as api from "../../api/recipes";

const RecipePage: NextPage = () => {
  const router = useRouter();
  const { id: idStr } = router.query;
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  useEffect(() => {
    const getRecipe = async () => {
      const data = await api.getRecipe(id);
      return data;
    };

    const id = Number(idStr);
    if (isNaN(id)) {
      // TODO:add message
      return;
    }

    getRecipe()
      .then((recipe) => {
        setRecipe(recipe);
        console.log(recipe);
      })
      .catch((err: any) => {
        console.error(err);
      });
  });
  return <div>{recipe && <div>{JSON.stringify(recipe)}</div>}</div>;
};

export default RecipePage;
