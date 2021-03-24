import React, { useEffect, useState, useMemo } from "react";
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
  const [hasNext, setHasNext] = useState<boolean>(false);
  const [hasPrev, setHasPrev] = useState<boolean>(false);
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
        const { recipes, links } = data;
        const { next, prev } = links;
        setHasNext(!!next);
        setHasPrev(!!prev);
        setRecipes(recipes);
      })
      .catch((err: any) => {});
  }, [q]);
  const nextPageNum = useMemo(() => {
    return page === undefined ? 2 : Number(page) + 1;
  }, []);
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
          {hasPrev && <a href={`/?page=${page - 1}`}>前へ</a>}
          {hasNext && <a href={`/?page=${nextPageNum}`}>次へ</a>}
        </div>
      )}
    </Layout>
  );
};

SearchPage.getInitialProps = ({ query }) => {
  return { query };
};

export default SearchPage;
