import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular/umd';
import { TabsPage } from './tabs';

@NgModule({
  declarations: [
    TabsPage,
  ],
  imports: [
    IonicPageModule.forChild(TabsPage),
  ],
})
export class TabsPageModule {}
