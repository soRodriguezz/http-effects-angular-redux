import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient
  ) { }

  getUsers() {
    return this.http.get(`https://reqres.in/api/users?per_page=6`)
      .pipe(
        map( (resp: any) => resp['data'])
      );
  }

  getUserById( id: string) {
    return this.http.get(`https://reqres.in/api/users/${id}`)
      .pipe(
        map( (resp: any) => resp['data'])
      );
  }

}
