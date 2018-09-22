import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {LoginPage} from '../login/login';

/**
 * Generated class for the BienvenidoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bienvenido',
  templateUrl: 'bienvenido.html',
})
export class BienvenidoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BienvenidoPage');
  }

  Ingresar(){

    this.navCtrl.push(LoginPage);


  }

}
