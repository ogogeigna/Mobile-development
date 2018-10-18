import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import firebase from 'firebase';

import { TabsPage } from '../pages/tabs/tabs';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { AuthService } from '../pages/services/auth';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;
  signinPage = SigninPage;
  signupPage = SignupPage;
  isAuthentificated = false;


// We have to use ViewChild to get the reference -> #nav
// ViewChild() will be initialized later, not at the point of the time we create this component.
  @ViewChild('nav') nav: NavController;
// The navigation [hasn't] been initialized when the [component is created].
// So inject it in constructor doesn't work.


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private menuCtrl: MenuController,
              private authService: AuthService) {
    
    // Copy whatever you need from Firebase
    firebase.initializeApp({
      apiKey: "AIzaSyAElZ6hzzrP7uBhESvdhZLivBFmDnyvsU4",
      authDomain: "ionic-recipebook-824ac.firebaseapp.com"
    });

    // This will automatically give us the [user object] even being NULL or undefined if we're not authenticated.
    firebase.auth().onAuthStateChanged(user => {
      // when user has been set, nav to tabsPage
      if (user) {
        this.isAuthentificated = true;
        // this.nav.setRoot(this.tabsPage);
        this.rootPage = TabsPage;
      } else {
        this.isAuthentificated = false;
        this.rootPage = SigninPage;
      }
    });


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  // After we get the 'nav' reference, we can set the page as the root page.
  onLoad(page: any) {
    this.nav.setRoot(page);   // nav => change the root page
    this.menuCtrl.close();    
  }

  onLogout() {
    this.authService.logout();
    this.menuCtrl.close();
    this.nav.setRoot(SigninPage);
  }
}

