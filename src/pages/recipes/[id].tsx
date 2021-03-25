/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import type { Recipe } from '../../types'
import * as api from '../../api/recipes'
import Layout from '../../components/layout'
import TwitterLogo from '../../../public/twitter.svg'
import LineLogo from '../../../public/line.svg'
import FacebookLogo from '../../../public/facebook.svg'
import ChefLogo from '../../../public/chef.svg'

const RecipePage: NextPage = () => {
    const router = useRouter()
    const { id: idStr } = router.query
    const [recipe, setRecipe] = useState<Recipe | null>(null)
    useEffect(() => {
        const getRecipe = async () => {
            const data = await api.getRecipe(id)
            return data
        }

        const id = Number(idStr)
        if (isNaN(id)) {
            // TODO:add message
            return
        }
        getRecipe()
            .then((recipe) => {
                setRecipe(recipe)
            })
            .catch((err: any) => {
                console.error(err)
            })
    }, [idStr])
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
                        {/* TODO:add OGP*/}
                        <div css={SnslogoListWrapperStyle}>
                            <TwitterLogo />
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
    margin:24px;
    background:#FAFAF5;
    border:1px solid #DDDBD6;
    padding:8px;
    border-radius:8px;
    > h3{
        font-weight:600;
    }
    > div{
        display:flex;
        > svg{
            width:20%;
        }
        > h3{
            width:80%;
            text-align:center;
        }
    }
`

export default RecipePage
