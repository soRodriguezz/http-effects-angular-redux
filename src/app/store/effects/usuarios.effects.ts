import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as usuariosActions from "../actions/usuarios.actions";

import { UsuarioService } from 'src/app/services/usuario.service';
import { mergeMap, tap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class UsuariosEffects {
    constructor(
        private actions$: Actions,
        private usuariosService: UsuarioService
    ) { }

    cargarUsuarios$ = createEffect(
        () => this.actions$.pipe(
            ofType( usuariosActions.cargarUsuarios ),
            tap( data => console.log('effect', data) ),
            mergeMap( 
                () => this.usuariosService.getUsers()
                    .pipe(
                        tap( data => console.log('get data', data) ),
                        map( users => usuariosActions.cargarUsuariosSuccess({ usuarios: users }) ),
                        catchError( error => of(usuariosActions.cargarUsuariosError({ payload: error })) )
                    )
            )
        )
    );
}