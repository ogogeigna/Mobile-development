import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular/umd';
import { EditRecipePage } from './edit-recipe';

@NgModule({
  declarations: [
    EditRecipePage,
  ],
  imports: [
    IonicPageModule.forChild(EditRecipePage),
  ],
})
export class EditRecipePageModule {}
