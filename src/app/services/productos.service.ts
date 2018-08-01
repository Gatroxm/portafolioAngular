import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Productos } from '../interfaces/productos.interface';

@Injectable()
export class ProductosService {

  cargando = true;
  productos: Productos[] = [];

  constructor( private http: HttpClient ) {

    this.cargarProductos();

  }

  private cargarProductos() {
    this.http.get('https://angular-portafolio-3b604.firebaseio.com/productos_idx.json')
    .subscribe((resp: Productos[]) => {
      this.productos = resp;
      console.log(this.productos);
      this.cargando = false;
    });
  }

}
