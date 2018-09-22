import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BienvenidoPage } from './bienvenido';

@NgModule({
  declarations: [
    BienvenidoPage,
  ],
  imports: [
    IonicPageModule.forChild(BienvenidoPage),
  ],
})
export class BienvenidoPageModule {}
