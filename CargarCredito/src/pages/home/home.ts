import { Component } from '@angular/core';
import { NavController ,NavParams,ToastController} from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AngularFireDatabase } from 'angularfire2/database';
import { AlertController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private scannedCode=null;
  private usuario:string;
  private barcodeScanner: BarcodeScanner=new BarcodeScanner();
  private listaCod:Array<any>;
  private saldo:number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private fdb:AngularFireDatabase,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
    ) {

    this.usuario=navParams.get("id");
    this.saldo=Number(navParams.get("saldo"));
    this.listaCod=new Array();
    this.CargarLista();
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'scan='+this.scannedCode+'-code_50=ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172',
      duration: 10000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  UpdateSaldoBD()
  {
    let id;

    if(this.usuario=="admin@gmail.com")
    {
      id="1";
    }else if(this.usuario=="invitado@gmail.com")
    {
      id="2";
    }else if(this.usuario=="usuario@gmail.com")
    {
      id="3";
    }else if(this.usuario=="anonimo@gmail.com")
    {
      id="4";
    }else if(this.usuario=="tester@gmail.com")
    {
      id="5";
    }

    //console.log(this.listaCod);
    this.fdb.list("usuarios").update(id,{saldo:this.saldo});
  }

  
  CargarCodigoBD()
  {
    this.fdb.list("scans").push({codigo:this.scannedCode,usuario:this.usuario});
  }

  ValidarCodigoBD()
  {
    let retorno=true;
    
    this.listaCod.forEach(element => {
      if(element["usuario"]==this.usuario && this.scannedCode==element["codigo"])
      {
        retorno=false;
      }
    });

    return retorno;
  }

  CargarLista(){
    this.fdb.list("scans").valueChanges().subscribe(data=>{
      data.forEach(element => { 
        this.listaCod.push(element);   
        //console.log(this.listaCod);   
      })
    });
  }

  ValidarCodigo():boolean{
    let retorno=false;
    let codigo_10="8c95def646b6127282ed50454b73240300dccabc"; 
    let codigo_50="ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172";
    let codigo_100="2786f4877b9091dcad7f35751bfcf5d5ea712b2f";

    this.presentToast();
    if(this.scannedCode==codigo_10)
    {
      if(this.ValidarCodigoBD()){
        this.saldo=this.saldo+10;
        retorno=true;
      }else{
        this.AlertCodigoAgregado();
      }
          
    }else if(this.scannedCode==codigo_50)
    {
      if(this.ValidarCodigoBD()){
      this.saldo=this.saldo+50;
      retorno=true;
      }else{
        this.AlertCodigoAgregado();
      }
    }else if(this.scannedCode==codigo_100)
    {
      if(this.ValidarCodigoBD()){
      this.saldo=this.saldo+100;
      retorno=true;
      }else{
        this.AlertCodigoAgregado();
      }
    }
    else{
      this.AlertCodigoError();
    }

    return retorno;
  }
  scanCode(){
    this.barcodeScanner.scan().then(barcodeData=>{
      this.scannedCode=barcodeData.text;
      
      if(this.ValidarCodigo())
      {
      this.UpdateSaldoBD();
      this.CargarCodigoBD();
      this.CargarLista();
      this.AlertSaldoAgregado();
      }
    })
  }

  pop(){
    this.navCtrl.pop();
  }

  AlertSaldoAgregado() {
    let alert = this.alertCtrl.create({
      title: 'Correcto',
      subTitle: 'Saldo Agregado.',
      buttons: ['Aceptar']
    });
    alert.present();
  }

  AlertCodigoError() {
    let alert = this.alertCtrl.create({
      title: 'ERROR',
      subTitle: 'Codigo Invalido.',
      buttons: ['Aceptar']
    });
    alert.present();
  }

  AlertCodigoAgregado() {
    let alert = this.alertCtrl.create({
      title: 'ERROR',
      subTitle: 'Codigo Ya Utilizado.',
      buttons: ['Aceptar']
    });
    alert.present();
  }

}
