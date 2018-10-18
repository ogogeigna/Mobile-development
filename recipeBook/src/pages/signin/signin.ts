import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../services/auth';
import { LoadingController, AlertController } from 'ionic-angular';


@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})

export class SigninPage {

  constructor(private authService: AuthService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {}

  onSignin(form: NgForm) {

    // TODO: create and present the spinner
    const loading = this.loadingCtrl.create({
      content: 'Signing you in...'
    });
    loading.present();

    // TODO: Let spinner dismiss after successfully signing up or not.
    // If not successfully sign up, present an alert dialog!
    this.authService.signin(form.value.email, form.value.password)
      .then(data => {         // successful case
        loading.dismiss();
      })
      .catch(error => {       // error case
        loading.dismiss();

        // message: will automatically show an error message by Firebase.
        const alert = this.alertCtrl.create({
          title: 'Signin failed!',
          message: error.message,
          buttons: ['OK']
        });
        alert.present();

      });
  }
  
}