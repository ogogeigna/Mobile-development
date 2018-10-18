import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../services/shopping-list';
import { Ingredient } from '../../models/ingredient';
import { PopoverController, LoadingController, AlertController } from 'ionic-angular';
import { AuthService } from '../services/auth';
import { DatabaseOptionsPage } from '../database-options/database-options';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  listItems: Ingredient[];

  // Make service can be accessed
  constructor(private slService: ShoppingListService, 
              private popoverCtrl: PopoverController,
              private authService: AuthService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {}

  // 要保证每次page is presented 时 都会被加载， so not use didLoad()
  ionViewWillEnter() {
    this.loadItems();
  }

  // 这就是我们传进来的NgForm
  onAddItem(form: NgForm) {
    
    // form.value
    this.slService.addItem(form.value.ingredientName, form.value.amount);
    form.reset();
    this.loadItems(); 
  }


  onCheckItem(index: number) {
    this.slService.removeItem(index);
    this.loadItems();
  }


  onShowOptions(event: MouseEvent) {

    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

// TODO: POPOVER
  // event: 如果不传event, popover就是显示在屏幕中间的一个dialog而已； 
  // 用了event之后，它就是pop在点击右上角直接显示的（mouse点击menu就出现在相应位置）
    const popover = this.popoverCtrl.create(DatabaseOptionsPage);
    popover.present({ev: event});

    // when the Popover has been successfully dismissed
    popover.onDidDismiss(
      data => {
        if (data.action == 'load') {

          loading.present();

          this.authService.getActiveUser().getIdToken()
            .then(
              (token: string) => {
                this.slService.fetchList(token)
                  .subscribe(
                    (list: Ingredient[]) => {
                      loading.dismiss();
                      
                      // Logic: first we shold check wether the list is NULL or not
                      if (list) {
                        this.listItems = list;
                      } else {
                        this.listItems = [];
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
                this.slService.storeList(token)
                  .subscribe(                               // subscribe to the observable methods returns
                    () => loading.dismiss(),
                    error => {
                      loading.dismiss();

                      // ❗️（error.message）❗️  is WRONG!
                      // 1. error is still the original Response object - 
                      //            we first have to extract the body (and convert it to a JS object) via json()
                      // 2. The actual message is not stored in a property named message, but in a property named error
                      this.handleError(error.json().error);
                    }
                  );
              }
            );

        }
      }
    );

  }


  // TODO: reload to get the new list
  private loadItems() {
    this.listItems = this.slService.getItems();
  }

  // we want to show the alert when there's an error
  private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'An error occured!',
      message: errorMessage,
      buttons: ['OK']
    });
    alert.present();
  }

}
