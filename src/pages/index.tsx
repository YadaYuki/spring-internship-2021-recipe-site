/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useEffect, useState, useMemo, useCallback } from 'react'
import * as api from '../api/recipes'
import { Recipe } from '../types'
import { NextPage } from 'next'
import Layout from '../components/layout'
import { SearchPageQuery } from '../types/query-type'
import RecipeCard from '../components/search/recipe-card'

interface Props {
    query: SearchPageQuery
}

const SearchPage: NextPage<Props> = ({ query }) => {
    const [recipes, setRecipes] = useState<Recipe[] | null>(null)
    const [hasNext, setHasNext] = useState<boolean>(false)
    const [hasPrev, setHasPrev] = useState<boolean>(false)
    const { q, page } = query
    const getLatestRecipes = useCallback(async () => {
        const data = await api.getRecipes(page)
        return data
    }, [page])
    const searchRecipes = useCallback(async () => {
        const data = await api.searchRecipes(q, page)
        return data
    }, [page, q])
    const isValidKeyWord = useMemo(() => {
        return q !== undefined && q !== ''
    }, [q])
    useEffect(() => {
        const getRecipes = isValidKeyWord ? searchRecipes : getLatestRecipes
        getRecipes()
            .then((data) => {
                const { recipes, links } = data
                const { next, prev } = links
                setHasNext(!!next)
                setHasPrev(!!prev)
                setRecipes(recipes)
            })
            .catch((err: any) => {
                console.error(err)
            })
    }, [getLatestRecipes, isValidKeyWord, q, searchRecipes])
    const nextPage = useMemo(() => {
        let nextPageStr = '/?'
        nextPageStr += `page=${page === undefined ? 2 : Number(page) + 1}`
        nextPageStr += q === undefined ? '' : `&q=${q}`
        return nextPageStr
    }, [page, q])

    const prevPage = useMemo(() => {
        let prevPageStr = `/?page=${page - 1}`
        prevPageStr += q === undefined ? '' : `&q=${q}`
        return prevPageStr
    }, [page, q])
    const renderPage = useMemo(() => {
        return page === undefined ? 1 : page
    }, [page])
    return (
        <Layout>
            {isValidKeyWord && (
                <div css={SearchResultMsgStyle}>
                    <h2>「{q}」<span>でレシピ検索しました</span></h2>
                </div>
            )}
            {recipes && (
                <div css={WrapperStyle}>
                    <div css={RecipeListWrapperStyle}>
                        {recipes.map((recipe) => {
                            return (
                                <RecipeCard key={recipe.id} recipe={recipe} />
                            )
                        })}
                    </div>
                    <div css={PaginationWrapperStyle}>
                        <div>
                            {hasPrev && (
                                <h3>
                                    <a href={prevPage}>前へ</a>
                                </h3>
                            )}
                        </div>
                        <h3>{renderPage}ページ目</h3>
                        <div>
                            {hasNext && (
                                <h3>
                                    <a href={nextPage}>次へ</a>
                                </h3>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    )
}

SearchPage.getInitialProps = ({ query }) => {
    return { query }
}


const SearchResultMsgStyle = css`
    margin: 8px 4px;
    > h2 {
        font-weight:600;
        text-align:center;
        > span {
            font-weight:400;
            font-size:12px;
        }
    }
`

const WrapperStyle = css`
    margin-top: 8px;
`

const PaginationWrapperStyle = css`
    display: flex;
    justify-content: space-around;
    border: 1px solid #f2f2f2;
    align-items: center;
    h3 {
        margin-top: 0.5em;
    }
`

const RecipeListWrapperStyle = css`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

export default SearchPage
