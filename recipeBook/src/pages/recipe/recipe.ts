import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { ShoppingListService } from '../services/shopping-list';
import { RecipesService } from '../services/recipes';

@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})

// Receive data (recipes' information)
export class RecipePage implements OnInit {

  recipe: Recipe;
  index: number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private slService: ShoppingListService,
    private recipesService: RecipesService,
    private alertCtrl: AlertController) {}

  ngOnInit() {
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
  }

  onEditRecipe() {
    // pass the data we need to EditRecipePage
    this.navCtrl.push(EditRecipePage, {mode: 'Edit', recipe: this.recipe, index: this.index});
  }

  onAddIngredients() {

    this.slService.addItems(this.recipe.ingredients);
  }

  onDeleteRecipe() {
    const alert = this.alertCtrl.create({
      title: 'Are you sure to delete the recipe?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.recipesService.removeRecipe(this.index);
            this.navCtrl.popToRoot();
          }
        },
        {
          text: 'No',
          role: 'cancel'
        }
      ]
    });

    alert.present();
  }

}
