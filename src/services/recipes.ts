import {Recipe} from "../models/recipes";
import {Ingredient} from "../models/ingredient";
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {AuthService} from "./auth";

@Injectable()
export class RecipesService {
     private recipes: Recipe[] = [];

     constructor( private http: Http, private authService: AuthService) {}

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

     storeList(token: string) {
         const userId = this.authService.getActiveUser().uid;
         return this.http.put('https://ionic-recipesbook.firebaseio.com/' + userId + '/recipes.json?auth=' + token, this.recipes)
             .map(res => res.json());
     }

     fetchList(token: string) {
         const userId = this.authService.getActiveUser().uid;
         return this.http.get('https://ionic-recipesbook.firebaseio.com/' + userId + '/recipes.json?auth=' + token)
             .map(res => {return res.json()})
             .do( recipes => {
                 if (recipes) {
                     this.recipes = recipes;
                 } else {
                     this.recipes = [];
                 }
             })
     }
}