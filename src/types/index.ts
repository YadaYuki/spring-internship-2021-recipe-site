
export type Author = {
  user_name: string;
};

export type Ingredient = {
  name: string;
  quantity: string;
}

export type Recipe = {
  id: number;
  title: string;
  description: string;
  image_url: string | null;
  author: Author
  published_at: string;
  steps: string[];
  ingredients:Ingredient[];
  related_recipes: number[];
};

export type ResponseRecipes = {
  recipes: Recipe[];
  links: {
    next?: string;
    prev?: string;
  };
}
export type QueryParamRecipes = {
  page?: number;
  id?: string;
};


