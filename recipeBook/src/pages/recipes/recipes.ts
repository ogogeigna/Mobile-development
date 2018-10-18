import { Component } from '@angular/core';
import { 
  NavController, 
  LoadingController, 
  PopoverController, 
  AlertController } from 'ionic-angular';

import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { RecipesService } from '../services/recipes';
import { Recipe } from '../../models/recipe';
import { RecipePage } from '../recipe/recipe';
import { AuthService } from '../services/auth';
import { DatabaseOptionsPage } from '../database-options/database-options';

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})

export class RecipesPage {
  recipes: Recipe[];

  constructor (private navCtrl: NavController, 
               private recipesServices: RecipesService,
               private loadingCtrl: LoadingController,
               private popoverCtrl: PopoverController,
               private authService: AuthService,
               private alertCtrl: AlertController) {}

  ionViewWillEnter() {
    this.recipes = this.recipesServices.getRecipes();
  }
  onNewRecipe() {
    // Pass an object {mode: 'New'} to EditRecipePage
    this.navCtrl.push(EditRecipePage, {mode: 'New'});
  }

  onLoadRecipe(recipe: Recipe, index: number) {
    // Notice: 我们不能单独传parameters，只能是打包到一个object中传递
    // Implement: 点击右上角button, navigate to RecipePage
    this.navCtrl.push(RecipePage, {recipe: recipe, index: index});
  }


  // Copy from shopping-list and change
  onShowOptions(event: MouseEvent) {

    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

// TODO: POPOVER
  // event: 如果不传event, popover就是显示在屏幕中间的一个dialog而已； 
  // 用了event之后，它就是pop在点击右上角直接显示的（mouse点击menu就出现在相应位置）
    const popover = this.popoverCtrl.create(DatabaseOptionsPage);
    popover.present({ev: event});

    // when the Popover  has been successfully dismissed
    popover.onDidDismiss(
      data => {
        if (data.action == 'load') {

          loading.present();

          this.authService.getActiveUser().getIdToken()
            .then(
              (token: string) => {
                this.recipesServices.fetchList(token)
                  .subscribe(
                    (list: Recipe[]) => {
                      loading.dismiss();
                      if (list) {
                        this.recipes = list;
                      } else {
                        this.recipes = [];
                      }
                    },
                    error => {
                      loading.dismiss();
                      this.handleError(error.json().error);
                    }
                  );
              }
            );

        } else if (data.action == 'store') {

          loading.present();

          // not only get token, but also check whether the token is valid/expired
          // 因为token或许只在一定时间内是有效的
          this.authService.getActiveUser().getIdToken()
            .then(
              // use this token to actually reach out to the web and fetch the data or, in this case, store data
              (token: string) => {
                this.recipesServices.storeList(token)
                  .subscribe(
                    () => loading.dismiss(),
                    error => {
                      loading.dismiss();
                      this.handleError(error.json().error);
                    }
                  );
              }
            );

        }
      }
    );

  }

  private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'An error occured!',
      message: 'errorMessage',
      buttons: ['OK']
    });
    alert.present();
  }

}
