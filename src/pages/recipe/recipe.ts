import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Recipe} from "../../models/recipes";
import {EditRecipePage} from "../edit-recipe/edit-recipe";

/**
 * Generated class for the RecipePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit{

  recipe: Recipe;
  index: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit() {
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
  }


  onEditRecipe(index: number) {
      this.navCtrl.push(EditRecipePage, {
          mode: 'Edit',
          recipe: this.recipe,
          index: this.index
      });
  }



}
