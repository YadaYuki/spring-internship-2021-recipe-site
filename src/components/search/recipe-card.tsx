/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react'
import { Recipe } from '../../types/'
import Link from 'next/link'
import moment from 'moment-timezone'

interface Props {
    recipe: Recipe
}

const renderMainIngredients = (recipe: Recipe) => {
    const mainIngredientNameList = recipe.ingredients
        .slice(0, 3)
        .map((ingredient) => {
            return ingredient.name
        })
    const mainIngredientNameListStr = `主材料:${mainIngredientNameList.join()}`
    return mainIngredientNameListStr.length > 20
        ? mainIngredientNameListStr.slice(0, 20) + '...'
        : mainIngredientNameListStr
}

const RecipeCard: React.FC<Props> = ({ recipe }) => {
    return (
        <div css={CardStyle}>
            <div css={ImageWrapperStyle}>
                <img
                    src={!recipe.image_url ? '/empty.png' : recipe.image_url}
                />
            </div>
            <div css={RecipeInfoWrapperStyle}>
                <h4 css={TitleStyle}>
                    <Link href={`recipes/${recipe.id}`}>
                        <a>{recipe.title}</a>
                    </Link>
                </h4>
                <p css={IngredientStyle}>{renderMainIngredients(recipe)}</p>
                <p css={PublishedAtStyle}>
                    投稿日：{moment(recipe.published_at).format('YYYY/MM/DD')}
                </p>
            </div>
        </div>
    )
}

const CardStyle = css`
    width: 152px;
    border: 1px solid #f2f2f2;
    margin: 4px;
    border-radius: 4px;
    height: 240px;
`

const ImageWrapperStyle = css`
    img {
        width: 100%;
        border-radius: 4px 0px;
        height: 80px;
    }
`

const RecipeInfoWrapperStyle = css`
    padding: 4px;
    margin: 4px;
`

const TitleStyle = css`
    font-weight: 600;
    height: 64px;
`

const IngredientStyle = css`
    height: 32px;
    font-size: 12px;
`

const PublishedAtStyle = css`
    height: 32px;
    font-size: 12px;
    text-align: right;
    color: #c4c4c4;
    line-height: 32px;
`

export default RecipeCard
