import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import { App, ViewController } from 'ionic-angular';
import {HomePage} from '../../pages/home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

items: any[];

constructor(public navCtrl: NavController, public appCtrl: App, public viewCtrl: ViewController, public navParams: NavParams , public auservice : AuthServiceProvider) {
  this.cargarDatos();
}

ionViewDidLoad() {

  console.log('ionViewDidLoad LoginPage');
  }

cargarDatos()
  {
   this.auservice.getItems().subscribe(
     datos => console.info(this.items=datos),
     error => console.error(error),
     () =>  console.log("ok")
   );
  }    

 pushPage() {
  this.navCtrl.push(HomePage);
  } 



}
