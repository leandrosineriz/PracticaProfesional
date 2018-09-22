import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";
import { AngularFireDatabase } from 'angularfire2/database';
import { LoadingController,Loading } from 'ionic-angular';
import { AlertController } from 'ionic-angular';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  
  private usuario;
  private contrasena;
  private usuario_OK:boolean;
  private contrasena_OK:boolean;
  private loader:Loading;
  private lista:Array<any>;
  private saldo;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fdb:AngularFireDatabase,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController
    ){ 
    /*this.fdb.list("usuarios").valueChanges().subscribe(
      data=>{ console.log(data[0]["clave"]);}
    );*/
    this.usuario_OK=false;
    this.contrasena_OK=false; 
    this.usuario="";
    this.contrasena="";
    this.lista=new Array();
    
    this.fdb.list("usuarios").valueChanges().subscribe(data=>{
      data.forEach(element => { 
        this.lista.push({nombre:element["nombre"],clave:element["clave"],saldo:element["saldo"]})
              
      })
    });

  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Cargando...",
      //duration: 3000
    });
    this.loader.present();  
  }

  dimissLoading(){
    this.loader.dismiss();
  }

  UsuarioError() {
    let alert = this.alertCtrl.create({
      title: 'ERROR',
      subTitle: 'Usuario Incorrecto',
      buttons: ['Aceptar']
    });
    alert.present();
  }

  ContrasenaError() {
    let alert = this.alertCtrl.create({
      title: 'ERROR',
      subTitle: 'Contraseña Incorrecta',
      buttons: ['Aceptar']
    });
    alert.present();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad LoginPage');
  }
  
  ComprobarUsuarios(){

    
      this.lista.forEach(element => { 
        if(this.usuario==element["nombre"])
        {       
          this.usuario_OK=true;      
          if(this.contrasena==element["clave"])
          {
            this.contrasena_OK=true;  
            this.saldo=element["saldo"];  
            console.log(this.saldo);       
          }                    
        }             
      });
    
  }

  Ingresar(){
    this.presentLoading();
    
    this.ComprobarUsuarios();    

      if(this.usuario_OK && this.contrasena_OK)
      {
        this.usuario_OK=false;
        this.contrasena_OK=false;
        this.contrasena="";
        this.navCtrl.push(HomePage,{
          id: this.usuario,
          saldo:this.saldo
        });
      }
      else{
        if(!this.usuario_OK){
          this.UsuarioError();
                 
        }else if(!this.contrasena_OK){
          this.ContrasenaError();
        }
       
      }
    this.dimissLoading();
  }

}

