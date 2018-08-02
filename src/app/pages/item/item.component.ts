import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { ProductosService } from '../../services/productos.service';
import { GetProduct } from '../../interfaces/productos.interface';
import { InfoPaginaService } from '../../services/info-pagina.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto: GetProduct;
  cargando = true;
  anio: number = new Date().getFullYear();
  id: String;

  constructor( private route: ActivatedRoute, public productosService: ProductosService, public _infoService: InfoPaginaService ) { }

  ngOnInit() {

    this.route.params.subscribe( parametros => {
        this.productosService.getProducto(parametros['id'])
        .subscribe((producto: GetProduct) => {
          this.producto = producto;
          this.cargando = false;
          this.id = parametros['id'];
        });
    });

  }

}
