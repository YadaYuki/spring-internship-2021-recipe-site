import React, { useEffect, useState } from "react";
import * as api from "../api/recipes";
import { Recipe } from "../types";
import { NextPage } from "next";
import Link from "next/link";
import Header from "../components/header";

const SearchPage: NextPage = () => {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  useEffect(() => {
    const getRecipes = async () => {
      const data = await api.getRecipes();
      return data;
    };
    getRecipes()
      .then((data) => {
        const { recipes } = data;
        setRecipes(recipes);
      })
      .catch((err: any) => {});
  });
  return (
    <div>
      <Header />
      {recipes && (
        <div>
          {recipes.map((recipe) => {
            return (
              <div>
                <Link href={`recipes/${recipe.id}`} >
                  <a >{recipe.title}</a>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
