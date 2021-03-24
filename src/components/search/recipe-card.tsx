/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { Recipe } from "../../types/";
import Link from "next/link";

interface Props {
  recipe: Recipe;
}

const renderIngredients = (recipe: Recipe) => {
  return recipe.ingredients
    .slice(0, 3)
    .map((ingredient) => {
      return ingredient.name;
    })
    .join();
};

const RecipeCard: React.FC<Props> = ({ recipe }) => {
  return (
    <div css={CardStyle}>
      <img src={recipe.image_url} />
      <div>
      <h4>
        <Link href={`recipes/${recipe.id}`}>
          <a>{recipe.title}</a>
        </Link>
      </h4>
      <p>主材料:{renderIngredients(recipe)}</p>
      </div>
    </div>
  );
};

const CardStyle = css`
  width: 144px;
  border: 1px solid #f2f2f2;
  margin: 8px;
  border-radius: 4px;
  height: 200px;
  > div{
    margin:4px;
  }
  > img {
    width: 100%;
    border-radius: 4px 0px;
  }
`;

export default RecipeCard;
