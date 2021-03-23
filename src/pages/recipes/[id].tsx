import React from "react";
import { NextPage } from "next";
import { useRouter } from 'next/router'

const RecipePage: NextPage = () => {
  const router = useRouter()
  const {id} = router.query
  return <div>{id}</div>;
};

export default RecipePage;
