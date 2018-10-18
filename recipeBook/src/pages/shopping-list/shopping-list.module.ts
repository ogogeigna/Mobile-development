import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular/umd';
import { ShoppingListPage } from './shopping-list';

@NgModule({
  declarations: [
    ShoppingListPage,
  ],
  imports: [
    IonicPageModule.forChild(ShoppingListPage),
  ],
})
export class ShoppingListPageModule {}
