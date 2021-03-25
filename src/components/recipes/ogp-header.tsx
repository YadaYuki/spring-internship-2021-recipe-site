import React from 'react'
import Head from 'next/head'
import type { Recipe } from '../../types'

interface Props {
    recipe: Recipe
}

const OgpHeader: React.FC<Props> = ({ recipe }) => {
    return (
        <Head>
            <title>{recipe.title}</title>
            <meta property="og:title" content={recipe.title} />
            <meta
                property="og:url"
                content="https://www.orangepage.net/recipes/detail_143385"
            />
            <meta property="og:site_name" content="Cooking Papa" />
            <meta property="og:description" content={recipe.description} />
            <meta property="og:image" content={recipe.image_url} />
            <meta property="og:locale" content="ja_JP" />
        </Head>
    )
}

export default OgpHeader
