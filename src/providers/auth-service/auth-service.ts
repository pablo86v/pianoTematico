
import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';

import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  usuario:string;
 items: FirebaseListObservable<any[]>;

  constructor(public http: Http,public db: AngularFireDatabase) {
    console.log('Hello AuthServiceProvider Provider');
    
  }


public setItem(){
   this.items.push({usuario:this.usuario});
   
 }

public getItems(){
  this.items = this.db.list('/usuario');
 
  return this.items;
}

}//class



