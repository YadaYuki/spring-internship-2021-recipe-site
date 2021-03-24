import React, { useEffect, useState } from "react";
import * as api from "../api/recipes";
import { Recipe } from "../types";
import { NextPage } from "next";
import Link from "next/link";
import Layout from "../components/layout";
import { SearchPageQuery } from "../types/query-type";

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
  const isValidKeyWord = () => {
    return q !== undefined && q !== "";
  };
  useEffect(() => {
    const getRecipes = isValidKeyWord() ? searchRecipes : getLatestRecipes;
    getRecipes()
      .then((data) => {
        const { recipes } = data;
        setRecipes(recipes);
      })
      .catch((err: any) => {});
  }, [q]);
  return (
    <Layout>
      {recipes && (
        <div>
          {recipes.map((recipe) => {
            return (
              <div key={recipe.id}>
                <Link href={`recipes/${recipe.id}`}>
                  <a>{recipe.title}</a>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </Layout>
  );
};

SearchPage.getInitialProps = ({ query }) => {
  return { query };
};

export default SearchPage;
