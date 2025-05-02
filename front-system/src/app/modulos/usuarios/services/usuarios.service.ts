import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { delay, first, map, of, switchMap, tap } from 'rxjs';
import { Usuario } from '../models/usuario';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {

  private API_USUARIO = `${environment.apiUrl}usuarios`
  private API_TELEFONES = `${environment.apiUrl}telefones`

  constructor(private http: HttpClient) { }

  listUserAndPhone(){
    return this.http.get<Usuario[]>(`${this.API_USUARIO}?_embed=telefones`)
    .pipe(
      first(),
      /*
      Saber o que o servidor está rescebendo pelo console
      tap(usuarios => console.log(usuarios))
      */
      // delay(15000),
    )
  }

  save(usuario: Usuario){

    if(usuario.id){
      return this.update(usuario)
    }

    console.log(usuario)
    return this.create(usuario)

  }

  private create(usuario: Usuario){
    return this.http.post<Usuario>(this.API_USUARIO, usuario)
  }

  private update(usuario: Partial<Usuario>){
    return this.http.patch<Usuario>(`${this.API_USUARIO}/${usuario.id}`, usuario)
  }

  remove(id: number){
    return this.http.delete(`${this.API_USUARIO}/${id}`)
  }

  loadById(id: number){
    return this.http.get<Usuario>(`${this.API_USUARIO}/${id}`)
  }

  validarEmailExistente(email: string, userId: string){
    return this.http.get(this.API_USUARIO)
    .pipe(
      delay(1050),
      map((usuarios: any) => {
        return usuarios.map((usuario: Usuario) => ({ id: usuario.email, email: usuario.email }))
      }),
      // tap(console.log),
      map((usuarios: any[]) => {
        // Verifica se o email está cadastrado, excluindo o usuário com o ID especificado
        return usuarios.some((usuario: Usuario) => usuario.email === email && String(usuario.email) !== String(userId))
      })
      // tap(console.log)
    )
  }
}



