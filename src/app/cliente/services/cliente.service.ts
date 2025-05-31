import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { cargadeperosnajes, personajesfavoritos } from '../../keys/keys';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  apiRickandMorty: string = cargadeperosnajes.cargarPersonajes;
  apinodejsgetFavorito: string = personajesfavoritos.getallFavorite;
  apinodejsdeleteFavorito: string = personajesfavoritos.deleteFavorite;
  apinodejspostFavorito: string = personajesfavoritos.createFavorite;

  constructor(private http: HttpClient) {}

  cargardatosapi(page: number) {
    return this.http.get(this.apiRickandMorty + page).pipe((res) => res);
  }

  cargarPersonajesfavoritos() {
    return this.http.get(this.apinodejsgetFavorito).pipe((res) => res);
  }

  crearPersonajesfavoritos(data: any) {
    return this.http.post(this.apinodejspostFavorito, data).pipe((res) => res);
  }

  eliminarPersonajesfavoritos(Id: string) {
    return this.http
      .delete(this.apinodejsdeleteFavorito + Id)
      .pipe((res) => res);
  }
}
