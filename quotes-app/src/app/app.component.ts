import { Component, ViewChild } from '@angular/core';

import { Platform, NavController, MenuController } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { SettingsPage } from '../pages/settings/settings';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // 原始的
  // rootPage:any = TabsPage;

  // 添加的
  // Let tabsPage holds TabsPage, and let settingsPage holds SettingsPage.
  tabsPage:any = TabsPage;
  settingsPage:any = SettingsPage;

  // 要用 ViewChild，而非inject NavController方法 ！！！
  @ViewChild('nav') nav: NavController;


  // Inject MenuController to manage the menu
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private menuCtrl: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }


  // TODO: Replace the root page
  // 可能你会想到要 inject NavController
  // any => because TabsPage and SettingsPage are two different pages
  onLoad(page: any) {
    this.nav.setRoot(page);

    // TODO: When we select a menu item, let the menu close automatically.
    this.menuCtrl.close();
  }
}

