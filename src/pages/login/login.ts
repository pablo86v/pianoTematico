import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ActionSheetController } from 'ionic-angular';
import { UsuarioServiceProvider } from '../../providers/usuario-service/usuario-service';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private arrUsuarios = [];
  private usuario;
  private contrasenia;
  private actionSheet;
  private loading;

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private actionSheetCtrl: ActionSheetController,
              private usuarioService: UsuarioServiceProvider,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController)
  {
    this.createLoading("Estableciendo conexión con la BD...");
    this.loading.present();
    this.traerUsuariosFB();
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  private ingresar() {
    let usuarioEncontrado = false;
    for(let i=0 ; i<this.arrUsuarios.length; i++)
    {
      if(this.usuario == this.arrUsuarios[i].nombre && this.contrasenia == this.arrUsuarios[i].clave)
      {
        usuarioEncontrado = true;
        this.createLoading("Por favor espere...");
        this.loading.present();
        setTimeout(()=> {
          this.navCtrl.push(HomePage);
        }, 1000);
        setTimeout(()=> {
          this.loading.dismiss();
        }, 3000);
        
      }
    }

    if(usuarioEncontrado == false)
    {
      let toast = this.toastCtrl.create({
        message: 'El usuario no existe!',
        duration: 3000
      });
      toast.present();
    }
  }

  private ingresarComo() {
  
    if(this.arrUsuarios.length == 0)
    {
      let alert = this.alertCtrl.create({
        title: 'Error!',
        subTitle: 'No se pudo conectar con firebase, intente màs tarde.',
        buttons: ['OK']
      });
      alert.present();
    }
    else{
      this.inicializarActionSheet();
      this.actionSheet.present();
    }
  }

  private traerUsuariosFB()
  {
    this.usuarioService.getUsuarios().subscribe(
      data => 
      {
        this.arrUsuarios = data;
        this.loading.dismiss();
        console.log(this.arrUsuarios);
      },
      err => console.error(err)
    )
  }

  private inicializarActionSheet()
  {
    this.actionSheet = this.actionSheetCtrl.create({
      title: 'Acceder como...',
      buttons: [
        {
          text: this.arrUsuarios[0].nombre,
          handler: () => {
            this.usuario = this.arrUsuarios[0].nombre;
            this.contrasenia = this.arrUsuarios[0].clave;
          }
        }, {
          text: this.arrUsuarios[1].nombre,
          handler: () => {
            this.usuario = this.arrUsuarios[1].nombre;
            this.contrasenia = this.arrUsuarios[1].clave;
          }
        }, 
        {
          text: this.arrUsuarios[2].nombre,
          handler: () => {
            this.usuario = this.arrUsuarios[2].nombre;
            this.contrasenia = this.arrUsuarios[2].clave;
          }
        }, 
        {
          text: this.arrUsuarios[3].nombre,
          handler: () => {
            this.usuario = this.arrUsuarios[3].nombre;
            this.contrasenia = this.arrUsuarios[3].clave;
          }
        }, 
        {
          text: this.arrUsuarios[4].nombre,
          handler: () => {
            this.usuario = this.arrUsuarios[4].nombre;
            this.contrasenia = this.arrUsuarios[4].clave;
          }
        }, 
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
  }

  private createLoading(message: string)
  {
    this.loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: message
    });
  }
}
