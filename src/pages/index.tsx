/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useState, useMemo } from "react";
import * as api from "../api/recipes";
import { Recipe } from "../types";
import { NextPage } from "next";
import Layout from "../components/layout";
import { SearchPageQuery } from "../types/query-type";
import RecipeCard from "../components/search/recipe-card";

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
  const renderPage = useMemo(() => {
    return page === undefined ? 1 : page;
  }, []);
  return (
    <Layout>
      {recipes && (
        <div css={WrapperStyle}>
          <div css={RecipeListWrapperStyle}>
            {recipes.map((recipe) => {
              return <RecipeCard recipe={recipe} />;
            })}
          </div>
          <div css={PaginationWrapperStyle}>
            <div>
              {hasPrev && (
                <h2>
                  <a href={`/?page=${page - 1}`}>前へ</a>
                </h2>
              )}
            </div>
            <h2>{renderPage}ページ目</h2>
            <div>
              {hasNext && (
                <h2>
                  <a href={`/?page=${nextPageNum}`}>次へ</a>
                </h2>
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

SearchPage.getInitialProps = ({ query }) => {
  return { query };
};

const WrapperStyle = css`
  margin-top:8px;
`;

const PaginationWrapperStyle = css`
  display: flex;
  justify-content: space-around;
  border: 1px solid #f2f2f2;
  align-items: center;
  h2 {
    margin-top: 0.5em;
  }
`;

const RecipeListWrapperStyle= css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;z
`;

export default SearchPage;
