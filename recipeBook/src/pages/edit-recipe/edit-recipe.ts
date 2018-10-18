import { Component, OnInit } from '@angular/core';
import { NavParams, ActionSheetController, AlertController, ToastController, NavController } from 'ionic-angular';

import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RecipesService } from '../services/recipes';
import { Recipe } from '../../models/recipe';


@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})


export class EditRecipePage implements OnInit {

  mode = 'New';
  selectOptions = ['Easy', 'Medium', 'Hard'];
  // React
  recipeForm: FormGroup;

  recipe: Recipe;
  index: number;

  constructor (private navParams: NavParams,
               private actionSheetCtrl: ActionSheetController,
               private alertCtrl: AlertController,
               private toastCtrl: ToastController,
               private recipesService: RecipesService,
               private navCtrl: NavController) {}
  // Receive the data from RecipePage
  ngOnInit() {
    this.mode = this.navParams.get('mode');


    if (this.mode == 'Edit') {
      // retrive data from recipe.ts
      this.recipe = this.navParams.get('recipe');
      this.index = this.navParams.get('index');
    }
    // then what will be changed in initializeForm()?? => go down

    // call initializeForm() to actually create the form
    this.initializeForm(); 
  }


  // After creating RecipeService, 再写这里
  onSubmit() {
    const value = this.recipeForm.value;

    // Only passing "value.ingredients" like this won't work. 
    // HTML we just store the name
    // so we should create a variable, ingredients array
    let ingredients = [];

    if (value.ingredients.length > 0) {

      // .map() => transfer each element in the array
      // transfer each string to an object with two properties
      ingredients = value.ingredients.map(name => {
        return {name: name, amount: 1};
      });
    }


    // check what mode it is
    if (this.mode == 'Edit') {
      this.recipesService.updateRecipe(this.index, value.title, value.descrioption, value.difficulty, ingredients);
    } else {
      // 这里不能直接将value.ingredients加进去，不能识别 name and amount
      // 所以⏫ onSubmit（）
      this.recipesService.addRecipe(value.title, value.description, value.difficulty, ingredients);
    }

    
    this.recipeForm.reset();
    this.navCtrl.popToRoot();
  }


  onManageIngredients() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Add Ingredient',
          handler: () => {
            this.createNewIngredientAlert().present();
          }
        },      
        {
          text: 'Remove all Ingredients',
          role: 'destructive',
          handler: () => {
            // remove step by step
            const fArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
            const len = fArray.length;

            if (len > 0) {

              for (let i = len - 1; i >= 0; i--) {
                fArray.removeAt(i);
              }


              const toast = this.toastCtrl.create({
                message: 'All ingredients were deleted!',
                duration: 1500,
                position: 'bottom'
              });
              toast.present();

            } 
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    actionSheet.present();
  }

  private createNewIngredientAlert() {

    // create and then show this alert
    return this.alertCtrl.create({

      title: 'Add Ingredient',

      // input => users will type, you can have more than one input
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        }
      ],

      // add two buttons
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          // get data
          handler: data => {
            if (data.name.trim() == '' || data.name == null) {

              const toast = this.toastCtrl.create({
                message: 'Please enter a valid value!',
                duration: 1500,
                position: 'bottom'
              });
              toast.present();

              return;

            }

            // <FormArray> is to tell this is a FormArray
            // 必须要标记this.recipeForm.get('ingredients')， 要注意怎么标记的<>
            (<FormArray>this.recipeForm.get('ingredients'))
              .push(new FormControl(data.name, Validators.required))

              const toast = this.toastCtrl.create({
                message: 'Item added!',
                duration: 1500,
                position: 'bottom'
              });
              toast.present();
          }
        }
      ]
    })
  }


  // React method:
  // create a FormGroup and pass the objects / auguments, according to HTML, to validate it
  private initializeForm() {

    let title = null;
    let descrioption = null;
    let difficulty = null;
    let ingredients = [];

    // override the default values
    if (this.mode == 'Edit') {
      title = this.recipe.title;
      descrioption = this.recipe.description;
      difficulty = this.recipe.difficulty;

      for (let ingredient of this.recipe.ingredients) {
        ingredients.push(new FormControl(ingredient.name, Validators.required));
      }
    }

    this.recipeForm = new FormGroup({

      // null => default value
      'title': new FormControl(title, Validators.required),
      'description': new FormControl(descrioption, Validators.required),
      'difficulty': new FormControl(difficulty, Validators.required),
      'ingredients': new FormArray(ingredients)
      // pass an empty array here

    });
  }
}

// 不需要inject the form module into the app.module => automatically
