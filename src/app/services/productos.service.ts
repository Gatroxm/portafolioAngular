import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Productos } from '../interfaces/productos.interface';
import { resolve } from '../../../node_modules/@types/q';

@Injectable()
export class ProductosService {

  cargando = true;
  productos: Productos[] = [];
  productosFiltrado: Productos[] = [];


  constructor(private http: HttpClient) {

    this.cargarProductos();

  }

  private cargarProductos() {

    return new Promise((resolve, reject) => {

      this.http.get('https://angular-portafolio-3b604.firebaseio.com/productos_idx.json')
        .subscribe((resp: Productos[]) => {
          this.productos = resp;
          this.cargando = false;
          resolve();
        });

    });

  }

  getProducto(id: String) {
    return this.http.get(`https://angular-portafolio-3b604.firebaseio.com/productos/${id}.json`);
  }

  buscaProducto(termino: string) {

    if (this.productos.length === 0) {
      this.cargarProductos().then(() => {
        this.filtrarProductos(termino);
      });
    } else {
      this.filtrarProductos(termino);
    }

  }

  private filtrarProductos(termino: string) {

    this.productosFiltrado = [];
    termino = termino.toLocaleLowerCase();

    this.productos.forEach(prod => {

      const titulolower = prod.titulo.toLocaleLowerCase();

      if (prod.categoria.indexOf(termino) >= 0 || titulolower.indexOf(termino)) {

        this.productosFiltrado.push(prod);

      }

    });
  }
}
