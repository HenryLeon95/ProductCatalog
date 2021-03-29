import { Component, OnInit } from '@angular/core';
import { Eleccion_Categoria, Selecciones, Selecciones2 } from '../../models/Generos';
import { CategoriesService } from '../../services/categories.service'
import { ProductsService } from '../../services/products.service'
import { User } from '../../models/User'
import { Category } from '../../models/Category'
import { Producto } from '../../models/Producto'
import { UsersService } from '../../services/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-anonymous',
  templateUrl: './anonymous.component.html',
  styleUrls: ['./anonymous.component.css']
})
export class AnonymousComponent implements OnInit {

  vacio: boolean = false;
  vacio2: boolean = true;
  vacio3: boolean = true;
  cambio: boolean = false;
  nombre_c: String = "";
  nombre_p: String = "";
  una_categoria: any = [];
  sub_categoria: any = [];
  productos: any[];
  seleccion: Eleccion_Categoria[] = [];
  seleccionado: Eleccion_Categoria = new Eleccion_Categoria(0, "null");
  escoger: Selecciones[] = [];
  escogido: Selecciones = new Selecciones("fecha");
  orden: Selecciones2[] = [];
  ordenado: Selecciones2 = new Selecciones2("descendente");

  categoria: Category = {
    id: 0,
    nombre_categoria: '',
    descripcion: '',
    padre: null,
    usuario_: 0
  };

  produ: Producto = {
    id: 0,
    codigo: '',
    nombre: '',
    imagen: '',
    descripcion: '',
    color: '',
    categoria_: 0,
    precio: 0,
    cantidad_disponible: 0,
    usuario_: 0
  };

  proenv = {
    nombre_categoria: '',
    nombre: '',
    orden1: '',
    orden2: ''
  }

  constructor(private userService: UsersService, private router: Router, private activedRoute: ActivatedRoute,
    private categoiresService: CategoriesService, private toastr: ToastrService, private productoService: ProductsService) { }

  ngOnInit() {
    this.vacio = false;
    this.vacio2 = true;
    this.vacio3 = true;
    this.cambio = false;
    this.nombre_p = "";
    this.nombre_c = "";
    this.seleccion.push(new Eleccion_Categoria(0, "null"));
    this.escoger.push(new Selecciones("fecha"));
    this.escoger.push(new Selecciones("precio"));
    this.orden.push(new Selecciones2("descendente"));
    this.orden.push(new Selecciones2("ascendente"));
    this.getCategories();
  }

  compararSeleccion(sele1: Eleccion_Categoria, sele2: Eleccion_Categoria) {
    if (sele1 == null || sele2 == null) {
      return false;
    }
    return sele1.descripcion === sele2.descripcion;
  }

  compararEscogido(sele1: Selecciones, sele2: Selecciones) {
    if (sele1 == null || sele2 == null) {
      return false;
    }
    return sele1.descripcion === sele2.descripcion;
  }

  compararOrden(sele1: Selecciones2, sele2: Selecciones2) {
    if (sele1 == null || sele2 == null) {
      return false;
    }
    return sele1.descripcion === sele2.descripcion;
  }

  getCategories() {
    delete this.categoria.padre;
    this.categoiresService.getCategoriaG(this.categoria).subscribe(
      res => {
        if (res == "vacio") {
          this.vacio = true;
        }
        else {
          this.una_categoria = res;
          for (let i = 0; i < this.una_categoria.length; i++) {
            this.seleccion.push(new Eleccion_Categoria(0, this.una_categoria[i].nombre_categoria));
          }
          this.vacio = false;
        }
      },
      err => console.error(err)
    );
  }

  CambioSelect(e) {
    console.log(this.seleccionado.descripcion);

    if (this.seleccionado.descripcion != "null") {
      this.categoria.nombre_categoria = this.seleccionado.descripcion;
      this.categoiresService.getCategoriaG2(this.categoria).subscribe(
        res => {
          if (res == "vacio") {
            //console.log("No tiene Sub Carpetas");
            this.vacio2 = true;
          }
          else {
            //this.categoria = res;
            this.vacio2 = false;
            this.sub_categoria = res;
            console.log(this.sub_categoria);
          }
        },
        err => console.error(err)
      );
    }
    else
    {
      this.vacio2 = true;
    }
  }

  buscar(){
    if(this.nombre_p == "" || this.seleccionado.descripcion == "null"){
      this.warnigSucces("Ingrese los campos solicitados");
    }
    else
    {
      delete this.proenv.orden1;
      delete this.proenv.orden2;
      this.proenv.nombre_categoria = this.seleccionado.descripcion.toString();
      this.proenv.nombre = this.nombre_p.toString();
      console.log(this.proenv);
      this.productoService.getProducto2(this.proenv).subscribe(
        res=>{
          if (res == "vacio") {
            console.log("No hay productos");
            this.vacio3 = true;
          }
          else {
            this.productos = res;
            console.log(this.productos);
            this.vacio3 = false;
          }
        },
        err => console.error(err)
      );
    }
  }

  buscar2(){
    if(this.nombre_p == "" || this.nombre_c == ""){
      this.warnigSucces("Ingrese los campos solicitados");
    }
    else
    {
      delete this.proenv.orden1;
      delete this.proenv.orden2;
      this.proenv.nombre_categoria = this.nombre_c.toString();
      this.proenv.nombre = this.nombre_p.toString();
      console.log(this.proenv);
      this.productoService.getProducto2(this.proenv).subscribe(
        res=>{
          if (res == "vacio") {
            console.log("No hay productos");
            this.vacio3 = true;
          }
          else {
            this.productos = res;
            console.log(this.productos);
            this.vacio3 = false;
          }
        },
        err => console.error(err)
      );
    }
  }

  otro(){
    this.cambio = !this.cambio;
  }

  Ordenar(){
    this.proenv.orden1 = this.escogido.descripcion.toString();
    this.proenv.orden2 = this.ordenado.descripcion.toString();

    if(this.proenv.orden1 == "fecha"){
      this.proenv.orden1 = "fecha_publicacion"
    }
    if(this.proenv.orden2 == "descendente"){
      this.proenv.orden2 = "desc";
    }
    else{
      this.proenv.orden2 = "asc";
    }

    this.productoService.getProducto2(this.proenv).subscribe(
      res=>{
        if (res == "vacio") {
          console.log("No hay productos");
          this.vacio3 = true;
        }
        else {
          this.productos = res;
          console.log(this.productos);
          this.vacio3 = false;
        }
      },
      err => console.error(err)
    );
  }

  //-----------------------------------------Sección de Mensajes-------------------------------
  showSuccess(mensaje: string) {
    this.toastr.success(mensaje, 'Éxito!');
  }

  errorSucces(mensaje: string) {
    this.toastr.error(mensaje, 'Error!');
  }

  infoSucces() {
    this.toastr.info('Hola', 'Info!');
  }

  warnigSucces(mensaje: string) {
    this.toastr.warning(mensaje, 'Atención!');
  }
}
