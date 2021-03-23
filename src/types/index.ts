export type Recipe = {
  id: number;
  title: string;
  description: string;
  image_url: string | null;
  author: {
    user_name: string;
  };
  published_at: string;
  steps: string[];
  ingredients: {
    name: string;
    quantity: string;
  }[];
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


