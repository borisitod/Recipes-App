import {Recipe} from "../models/recipes";
import {Ingredient} from "../models/ingredient";

export class RecipesService {
     private recipes: Recipe[] = [];

     addRecipe(title: string, description: string, difficulty: string, ingredients: Ingredient[]){
         this.recipes.push(new Recipe(title, difficulty, description, ingredients));
     }

     getRecipes() {
         return this.recipes.slice();
     }

     updateRecipe(
         index: number,
         title: string,
         description: string,
         difficulty: string,
         ingredients: Ingredient[]
         )
     {
        this.recipes[index] =  new Recipe(title, difficulty, description, ingredients);
     }

     removeRecipe(index: number) {
         this.recipes.splice(index, 1);
     }
}