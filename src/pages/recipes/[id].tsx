/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import type { Recipe } from "../../types";
import * as api from "../../api/recipes";
import Layout from "../../components/layout";

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
      })
      .catch((err: any) => {
        console.error(err);
      });
  }, []);
  return (
    <Layout>
      {recipe && (
        <div css={WrapperStyle}>
          {/* TODO:Fix To next/image */}
          <img src={recipe.image_url} />
          <div css={RecipeWrapperStyle}>
            <h2>{recipe.title}</h2>
            <p
              css={css`
                margin-top: 16px;
              `}
            >
              {recipe.description}
            </p>
            {/* TODO:add SNS Share Button */}
            <h3 css={SubTitleStyle}>材料</h3>
            {recipe.ingredients.map((ingredient) => {
              return (
                <p>
                  {ingredient.name}:{ingredient.quantity}
                </p>
              );
            })}
             <h3 css={SubTitleStyle}>作り方</h3>
            {recipe.steps.map((step,idx) => {
              return (
                <p>
                  {idx+1}: {step}
                </p>
              );
            })}
            <div css={css`margin-bottom:24px;`}>
              <h2>
              作者:{recipe.author.user_name}
              </h2>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

const WrapperStyle = css`
  width;100%;
  max-width:560px;
  > img{
    width:100%;
  }
`;

const RecipeWrapperStyle = css`
  margin: 16px;
`;

const SubTitleStyle = css`
  font-weight: 600;
  border-bottom:1px solid #000;
`;

export default RecipePage;
