import React, { useEffect, useState } from "react";
import * as api from "../api/recipes";
import { Recipe } from "../types";
import { NextPage } from "next";
import Link from "next/link";
import Header from "../components/header";
import {SearchPageQuery} from "./query-type"

interface Props {
  query: SearchPageQuery;
}

const SearchPage: NextPage<Props> = ({ query }) => {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const { q, page } = query;
  const getLatestRecipes = async () => {
    const data = await api.getRecipes(page);
    return data;
  };
  const searchRecipes = async () => {
    const data = await api.searchRecipes(q, page);
    return data;
  };
  useEffect(() => {
    const getRecipes = q === undefined ? getLatestRecipes : searchRecipes;
    getRecipes()
      .then((data) => {
        const { recipes } = data;
        setRecipes(recipes);
      })
      .catch((err: any) => {});
  }, []);
  return (
    <div>
      <Header />
      {recipes && (
        <div>
          {recipes.map((recipe) => {
            return (
              <div>
                <Link href={`recipes/${recipe.id}`}>
                  <a>{recipe.title}</a>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

SearchPage.getInitialProps = ({ query }) => {
  return { query };
};

export default SearchPage;
