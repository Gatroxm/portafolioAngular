import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina, Equipo } from '../interfaces/info-pagina.interface';

@Injectable()
export class InfoPaginaService {
  info: InfoPagina = {};
  cargada = false;
  equipo: Equipo;

  constructor(private http: HttpClient) {

    // Leer archivo Json

    this.cargarInfo();
    this.cargarEquipo();

  }

  private cargarInfo() {
    this.http.get('assets/data/data-pagina.json')
      .subscribe((resp: InfoPagina) => {
        this.cargada = true;
        this.info = resp;
        // console.log(this.info);
      });
  }

  private cargarEquipo() {

    this.http.get('https://angular-portafolio-3b604.firebaseio.com/equipo.json')
    .subscribe((respEquipo: Equipo) => {
      this.equipo = respEquipo;
      // console.log(this.equipo);
    });

  }

}
