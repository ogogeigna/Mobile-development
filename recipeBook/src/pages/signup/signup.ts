import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth';
import { LoadingController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(private authService: AuthService, 
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {}

  onSignup(form: NgForm) {

    // 在链接server传送data时候转圈圈的spinner的显示
    const loading = this.loadingCtrl.create({
      content: 'Sigining you up...'
    });
    loading.present();


    this.authService.signup(form.value.email, form.value.password)
      .then(data => {
        loading.dismiss();
      })
      .catch(error => {
        loading.dismiss();
        
        const alert = this.alertCtrl.create({
          title: 'Signup failed!',
          message: error.message,   //因为error中已经包含了有message了
          buttons: ['OK']
        });
        alert.present();
      });

  }

}
