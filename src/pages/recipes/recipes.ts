import {Component} from '@angular/core';
import {NavController, NavParams} from "ionic-angular";
import {Recipe} from "../../models/recipes";
import {RecipesService} from "../../services/recipes";
import {RecipePage} from "../recipe/recipe";
import {EditRecipePage} from "../edit-recipe/edit-recipe";

@Component({
    selector: 'page-recipes',
    templateUrl: 'recipes.html',
})
export class RecipesPage {

    recipes: Recipe[];

    constructor(private navCtrl: NavController, private recipesService: RecipesService, private navParam: NavParams) {
    }

    ionViewWillEnter(){
        this.recipes = this.recipesService.getRecipes();
    }

    onNewRecipe() {
        this.navCtrl.push(EditRecipePage, {mode: 'New'})
    }

    onLoadRecipe(recipe: Recipe, index: number) {
        this.navCtrl.push(RecipePage, {
            recipe: recipe,
            index: index
        })
    }
}
