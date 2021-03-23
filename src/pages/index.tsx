import React,{useEffect} from 'react'
import {getRecipes} from "../api/recipes"

interface Props {}

const TopPage:React.FC<Props> = () => {
  useEffect(()=>{
    const fetchData = async()=>{
      const data = await getRecipes()
      console.log(data)
    }
    fetchData()
  })
return (<div>Hogehoge</div>)
}

export default TopPage