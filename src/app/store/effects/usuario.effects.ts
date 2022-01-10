import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as usuariosActions from "../actions";

import { UsuarioService } from 'src/app/services/usuario.service';
import { mergeMap, tap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class UsuarioEffects {
    constructor(
        private actions$: Actions,
        private usuariosService: UsuarioService
    ) { }

    cargarUsuario$ = createEffect(
        () => this.actions$.pipe(
            ofType( usuariosActions.cargarUsuario ),
            tap( data => console.log('effect', data) ),
            mergeMap( 
                (action) => this.usuariosService.getUserById( action.id )
                    .pipe(
                        tap( data => console.log('get data', data) ),
                        map( user => usuariosActions.cargarUsuarioSuccess({ usuario: user }) ),
                        catchError( error => of(usuariosActions.cargarUsuarioError({ payload: error })) )
                    )
            )
        )
    );
}