import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';
import { ActionSheetController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private actionSheet;
  private url_img = [];
  private classBtnTematica='btn-animales';
  private faIconGrabar = "fa-microphone";
  private boolGrabarSecuencia: boolean = false;
  private secuenciaGrabada = [];
  private faIconReproducir = "fa-play-circle";
  private indiceSecuencia = -1;
  private idReproduciendose;

  private disabledBtnReproducir = false;
  private disabledBtnGrabar = false;

  constructor(public navCtrl: NavController,
              private nativeAudio: NativeAudio,
              private actionSheetCtrl: ActionSheetController,
              private toastCtrl: ToastController)
  {
    this.instanciarAudios('insectos');
    this.cambiarImagenes('insectos');

  }

  private instanciarAudios(tematica: string)
  {
    this.secuenciaGrabada = [];

    this.nativeAudio.unload('id_1');
    this.nativeAudio.unload('id_2');
    this.nativeAudio.unload('id_3');
    this.nativeAudio.unload('id_4');
    this.nativeAudio.unload('id_5');
    this.nativeAudio.preloadSimple('id_1','assets/sound/' +tematica+ '/1.mp3').then((menj)=>this.functSuccess(menj),(err)=>this.functSuccess(err));
    this.nativeAudio.preloadSimple('id_2','assets/sound/' +tematica+ '/2.mp3').then((menj)=>this.functSuccess(menj),(err)=>this.functSuccess(err));
    this.nativeAudio.preloadSimple('id_3','assets/sound/' +tematica+ '/3.mp3').then((menj)=>this.functSuccess(menj),(err)=>this.functSuccess(err));
    this.nativeAudio.preloadSimple('id_4','assets/sound/' +tematica+ '/4.mp3').then((menj)=>this.functSuccess(menj),(err)=>this.functSuccess(err));
    this.nativeAudio.preloadSimple('id_5','assets/sound/' +tematica+ '/5.mp3').then((menj)=>this.functSuccess(menj),(err)=>this.functSuccess(err));
  }

  private functSuccess(mensaje)
  {
    console.log(mensaje);
  }

  private playSound(id_sound: string)
  {
    this.idReproduciendose = id_sound;
    this.nativeAudio.play(id_sound).then((msg)=>this.functSuccess(msg), (err) => this.functSuccess(err));

    if(this.boolGrabarSecuencia == true)
    {
      this.secuenciaGrabada.push(id_sound);
    }
  }

  private cambiarTematica() {
    this.instanciarAccionSheet();
    this.actionSheet.present();
  }

  private cambiarImagenes(tematica: string)
  {

    this.url_img = [
      {
        "url": "./assets/img/" +tematica+ "/1.png"
      },
      {
        "url": "./assets/img/" +tematica+ "/2.png"
      },
      {
        "url": "./assets/img/" +tematica+ "/3.png"
      },
      {
        "url": "./assets/img/" +tematica+ "/4.png"
      },
      {
        "url": "./assets/img/" +tematica+ "/5.png"
      }
    ];
  
  }

    private instanciarAccionSheet()
    {
      this.actionSheet = this.actionSheetCtrl.create({
        title: 'Elegir temática',
        buttons: [
          {
            text: 'Playa argentina',                         /* <---- Cambio de temática */
            handler: () => {
              this.cambiarImagenes('playa');      
              this.instanciarAudios('playa');
              this.classBtnTematica = "btn-instrumentos"; /* <---- Cambio la imagen del boton de cambiar temática */
              this.faIconReproducir = "fa-play-circle";   /* <---- Pongo el botón de reproducir en play */
              this.disabledBtnGrabar = false;
              this.disabledBtnReproducir = false;
              this.faIconGrabar = "fa-microphone";
              this.secuenciaGrabada = [];
            }
          },{
            text: 'Insectos',
            handler: () => {
              this.cambiarImagenes('insectos');      
              this.instanciarAudios('insectos');
              this.classBtnTematica = "btn-animales";     /* <---- Cambio la imagen del boton de cambiar temática */
              this.faIconReproducir = "fa-play-circle";   /* <---- Pongo el botón de reproducir en play */
              this.disabledBtnGrabar = false;
              this.disabledBtnReproducir = false;
              this.faIconGrabar = "fa-microphone";
              this.secuenciaGrabada = [];
            }
          },{
            text: 'Vehículos',
            handler: () => {
              this.cambiarImagenes('vehiculos');   
              this.instanciarAudios('vehiculos');
              this.classBtnTematica = "btn-vehiculos";    /* <---- Cambio la imagen del boton de cambiar temática */
              this.faIconReproducir = "fa-play-circle";   /* <---- Pongo el botón de reproducir en play */
              this.disabledBtnGrabar = false;
              this.disabledBtnReproducir = false;
              this.faIconGrabar = "fa-microphone";
              this.secuenciaGrabada = [];
            }
          } ,{
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
          
        ]
      });   
    }

    private grabarSecuencia()
    {
      if(this.faIconGrabar == "fa-microphone")           /* <---- Si el icono actual es el de grabación, grabo la secuencia introducida */
      {
        this.faIconGrabar = "fa-pause";                  /* <---- Cambio el icono del botón a pause */
        this.boolGrabarSecuencia = true;
        this.secuenciaGrabada = [];                      /* <---- Borro la secuencia que pudo haberse grabado anteriormente */
        this.disabledBtnReproducir = true;               /* <---- Deshabilito el botón de reproducir */
        this.mensajeToast("Grabando...");
      }
      else
      {
        this.faIconGrabar = "fa-microphone"
        console.log(this.secuenciaGrabada);
        this.boolGrabarSecuencia = false;
        this.disabledBtnReproducir = false;
      }
    }

    private reproducirSecuencia()
    {
      console.log(this.faIconReproducir);

      if(this.secuenciaGrabada.length == 0)
      {
        this.mensajeToast("No posee ninguna secuencia grabada");
      }
      else
      {
        if(this.faIconReproducir == "fa-play-circle")
        {
          this.faIconReproducir = "fa-stop-circle";
          this.disabledBtnGrabar = true;
          this.reproducir();
          this.mensajeToast("Reproduciendo...");
        }
        else
        {
          if(this.faIconReproducir == "fa-stop-circle")
          {
            this.faIconReproducir = "fa-play-circle";
            this.disabledBtnGrabar = false;

            this.nativeAudio.stop(this.secuenciaGrabada[this.indiceSecuencia]).then((msg)=>this.functSuccess(msg), (err) => this.functSuccess(err));
          }
        }
      }
    }

    private reproducir()
    {
      this.indiceSecuencia += 1;
      console.log("Indice secuencia: " +this.indiceSecuencia);

      if(this.indiceSecuencia < this.secuenciaGrabada.length){
        this.nativeAudio.play(this.secuenciaGrabada[this.indiceSecuencia], ()=> this.reproducir()).then((msg)=>this.functSuccess(msg), (err) => this.functSuccess(err));
      }
      else{
        console.log("Estoy cambiando el boton de stop por play");
        this.faIconReproducir = "fa-play-circle";
        this.disabledBtnGrabar = false;
        this.indiceSecuencia = -1;
      }
    }
    

    private mensajeToast(message: string)
    {
      let toast = this.toastCtrl.create({
        message: message,
        duration: 3000
      });
      toast.present();
    }

    private desloguearse()
    {
      this.nativeAudio.stop(this.idReproduciendose).then((msg)=>this.functSuccess(msg), (err) => this.functSuccess(err));
      this.navCtrl.push(LoginPage);

    }

}
