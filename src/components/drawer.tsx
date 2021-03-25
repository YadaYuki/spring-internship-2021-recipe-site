/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react'
import { Drawer } from 'antd'
import { Input } from 'antd'
import DietLogo from '../../public/diet.svg'
import DishLogo from '../../public/dish.svg'
import Link from 'next/link'
import { SeasonalFoodList, PopularDishList } from '../value/food'

const { Search } = Input

interface Props {
    handleClose: () => void
    visible: boolean
}

const SearchDrawer: React.FC<Props> = ({ handleClose, visible }) => {
    return (
        <Drawer
            placement="right"
            closable={false}
            onClose={handleClose}
            visible={visible}
            getContainer={false}
            css={DrawerStyle}
        >
            <h1>レシピ検索</h1>
            <Search
                placeholder="料理名・食材名を入力"
                onSearch={(q: string) => {
                    location.href = `/?q=${q}`
                }}
            />

            <div>
                <div css={SubTitleStyle}>
                    <DietLogo />
                    <h3>食材からレシピを探す</h3>
                </div>
                <div css={FoodListWrapperStyle}>
                    {SeasonalFoodList.map((seasonalFood, idx) => {
                        return (
                            <a
                                css={FoodListItemStyle(idx % 2 === 0)}
                                key={idx}
                                href={`/?q=${seasonalFood}`}

                            >
                                {seasonalFood}
                            </a>
                        )
                    })}
                </div>
                <div css={SubTitleStyle}>
                    <DishLogo />
                    <h3>料理名からレシピを探す</h3>
                </div>
                <div css={FoodListWrapperStyle}>
                    {PopularDishList.map((popularDish, idx) => {
                        return (
                            <a
                                css={FoodListItemStyle(idx % 2 === 0)}
                                key={idx}
                                href={`/?q=${popularDish}`}
                            >
                                {popularDish}
                            </a>
                        )
                    })}
                </div>
            </div>
        </Drawer>
    )
}

const DrawerStyle = css`
    > .ant-drawer-content-wrapper {
        width: 80% !important;
    }
    .ant-drawer-body {
        > span {
            width: 100% !important;
        }
        > div {
            margin-top: 16px;
        }
    }
    h1 {
        text-align: center;
    }
`

const SubTitleStyle = css`
    display: flex;
    margin: 16px 0;
    > h3 {
        margin: 0;
        margin-left: 4px;
        line-height: 36px;
    }
    > svg {
        width: 40px;
        height: 36px;
    }
`

const FoodListWrapperStyle = css`
    display: flex;
    flex-wrap: wrap;
`
const FoodListItemStyle = (isEven: boolean) => {
    return css`
        width: 33.3%;
        text-align: center;
        color: black;
        background: ${isEven ? '#fff' : '#F2F2F2'};
        border: 1px solid #f2f2f2;
        height:48px;
        line-height:48px;
    `
}

export default SearchDrawer
