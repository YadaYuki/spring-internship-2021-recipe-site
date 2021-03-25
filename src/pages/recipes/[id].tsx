/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import type { Recipe } from '../../types'
import * as api from '../../api/recipes'
import Layout from '../../components/layout'
import TwitterLogo from '../../../public/twitter.svg'
import LineLogo from '../../../public/line.svg'
import FacebookLogo from '../../../public/facebook.svg'
import ChefLogo from '../../../public/chef.svg'
import OgpHeader from '../../components/recipes/ogp-header'

interface Props {
    recipe: Recipe
    hostUrl: string
}

const RecipePage: NextPage<Props> = ({ recipe, hostUrl }) => {
    const url = `${hostUrl}/recipes/${recipe.id}`
    return (
        <Layout>
            <OgpHeader recipe={recipe} />
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
                        <div css={SnslogoListWrapperStyle}>
                            <a
                                href={`https://twitter.com/intent/tweet?url=${url}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <TwitterLogo />
                            </a>

                            <LineLogo />
                            <FacebookLogo />
                        </div>
                        <div css={IngredientWrapperStyle}>
                            <h3 css={SubTitleStyle}>材料</h3>
                            <ul css={IngredientListStyle}>
                                {recipe.ingredients.map((ingredient) => {
                                    return (
                                        <li
                                            css={IngredientItemStyle}
                                            key={ingredient.name}
                                        >
                                            <span>{ingredient.name}</span>
                                            {ingredient.quantity}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                        <div css={StepWrapperStyle}>
                            <h3 css={SubTitleStyle}>作り方</h3>
                            <ul css={StepListStyle}>
                                {recipe.steps.map((step, idx) => {
                                    return (
                                        <li css={StepItemStyle} key={idx}>
                                            <div css={StepLabelStyle}>
                                                <p> {idx + 1} </p>
                                            </div>
                                            <div css={StepDescriptionStyle}>
                                                {step}
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                        <div css={AuthorItemStyle}>
                            <h3>このレシピの作者</h3>
                            <div>
                                <ChefLogo />
                                <h3>{recipe.author.user_name}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = Number(context.params.id)
    if (isNaN(id)) {
        return
    }
    const hostUrl = context.req.headers.host
    const data = await api.getRecipe(id)
    return { props: { recipe: data, hostUrl } }
}
const WrapperStyle = css`
  width;100%;
  max-width:560px;
  padding-bottom:16px;
  > img{
    width:100%;
  }
`

const SnslogoListWrapperStyle = css`
    display: flex;
    margin-bottom: 8px;
    > svg {
        width: 40px;
        height: 40px;
        margin-right: 8px;
    }
    > a > svg {
        width: 40px;
        height: 40px;
        margin-right: 8px;
    }
`

const IngredientWrapperStyle = css`
    margin-top: 24px;
`

const IngredientListStyle = css`
    list-style: none;
    margin: 0 !important;
    padding: 0 !important;
`

const IngredientItemStyle = css`
    padding: 15px 0;
    font-weight: 500;
    line-height: 1.25;
    letter-spacing: 0.05em;
    border-bottom: 1px solid #ddd;
    > span {
        margin-right: 8px;
    }
`

const StepWrapperStyle = css`
    margin-top: 24px;
`

const StepListStyle = css`
    list-style: none;
    margin: 0 !important;
    padding: 0 !important;
`

const StepItemStyle = css`
    padding: 15px 0;
    font-weight: 500;
    line-height: 1.25;
    letter-spacing: 0.05em;
    border-bottom: 1px solid #ddd;
    display: flex;
`

const StepLabelStyle = css`
    margin-right: 8px;
    > p {
        background: #6a3c3c;
        text-align: center;
        color: #fff;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        line-height: 24px;
    }
`

const StepDescriptionStyle = css`
    width: 90%;
`

const RecipeWrapperStyle = css`
    margin: 16px;
`

const SubTitleStyle = css`
    font-weight: 600;
    border-bottom: 1px solid #c4c4c4;
    margin: 8px 0 0;
`

const AuthorItemStyle = css`
    margin: 24px;
    background: #fafaf5;
    border: 1px solid #dddbd6;
    padding: 8px;
    border-radius: 8px;
    > h3 {
        font-weight: 600;
    }
    > div {
        display: flex;
        > svg {
            width: 20%;
        }
        > h3 {
            width: 80%;
            text-align: center;
        }
    }
`

export default RecipePage
