import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


@Injectable()
export class UsuarioServiceProvider {

  private usuarioObservable : FirebaseListObservable<any[]> = this.db.list('/usuario');

  constructor(private db: AngularFireDatabase) {
    console.log('Hello UsuarioServiceProvider Provider');
  }

  public getUsuarios()
  {
    return this.usuarioObservable;
  }

}
