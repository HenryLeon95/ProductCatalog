import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service'
import { User } from '../../models/User'
import { Category } from '../../models/Category'
import { Producto } from '../../models/Producto'
import { UsersService } from '../../services/users.service';
import { ProductsService } from '../../services/products.service'
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Eleccion_Categoria} from '../../models/Generos';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  una_categoria: any = [];
  sub_categoria: any = [];
  productos: any[];
  id_cat: number = 0;
  nombre_cat: string = '0';
  nombre_cat2: string = '0';
  vacio: boolean = false;
  vacio2: boolean = false;
  view: boolean = false;
  edit: boolean = false;
  ver_pro:boolean = false;
  seleccion: Eleccion_Categoria[] = [];
  seleccionado: Eleccion_Categoria = new Eleccion_Categoria(0, "null");

  categoria: Category = {
    id: 0,
    nombre_categoria: '',
    descripcion: '',
    padre: null,
    usuario_: 0
  };

  user: User = {
    id: 0,
    nombre: '',
    apellido: '',
    clave: '',
    correo: '',
    telefono: 0,
    fotografia: '',
    genero: '',
    direccion: '',
    credito_: 0,
    ganancia: 0,
    rol_: 0,
    estado_: 0
  };

  producto: Producto = {
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

  constructor(private userService: UsersService, private router: Router, private activedRoute: ActivatedRoute,
    private categoiresService: CategoriesService, private toastr: ToastrService,
    private productsService: ProductsService) { }

  ngOnInit() {
    this.view = false;
    this.ver_pro = false;
    this.id_cat = 0;
    this.nombre_cat = '0';
    this.nombre_cat2 = '0';
    this.seleccion.push(new Eleccion_Categoria(0, "null"));
    this.userService.getUser(localStorage.getItem('id')).subscribe(
      res => {
        this.user = res;
        this.categoria.usuario_ = this.user.id;
        this.getCategories();
      },
      err => console.log(err)
    );
  }

  mostrar(){
    this.vacio2 =true;
    this.categoria.descripcion = '';
    this.categoria.nombre_categoria= '';
  }

  getCategories() {
    delete this.categoria.padre;
    this.categoiresService.getCategoria(this.categoria).subscribe(
      res => {
        //console.log(res);
        if (res == "vacio") {
          this.vacio = true;
        }
        else {
          //this.categoria = res;
          this.una_categoria = res;
          for(let i=0; i<this.una_categoria.length; i++){
            //console.log(this.una_categoria[i]);
            this.seleccion.push(new Eleccion_Categoria(this.una_categoria[i].id, this.una_categoria[i].nombre_categoria));
          }
          this.vacio = false;
        }
      },
      err => console.error(err)
    );
  }

  addCategory() {
    delete this.categoria.id;
    console.log(this.categoria);
    this.categoiresService.saveCategory(this.categoria).subscribe(
      res => {
        this.showSuccess('Se ha creado la categoría!');
        this.router.navigate(['/user']);
        location.reload();
        //this.ngOnInit();
      },
      err => console.log(err)
    );
  }
  addCategory2() {
    if(this.seleccionado.padre == 0){
      this.categoria.padre = 0;
      delete this.categoria.padre;
    }
    else{
      this.categoria.padre = this.seleccionado.padre;
    }
    delete this.categoria.id;
    this.categoria.usuario_ = this.user.id;
    console.log("enviando");
    console.log(this.categoria);
    this.categoiresService.saveCategory(this.categoria).subscribe(
      res => {
        this.showSuccess('Se ha creado la categoría!');
        this.router.navigate(['/user']);
        location.reload();
        //this.ngOnInit();
      },
      err => console.log(err)
    );
  }

  compararSeleccion(sele1: Eleccion_Categoria, sele2: Eleccion_Categoria) {
    if (sele1 == null || sele2 == null) {
      return false;
    }
    return sele1.descripcion === sele2.descripcion;
  }

  ver(cat){
    this.categoria.padre = cat.id;
    this.nombre_cat = cat.nombre_categoria;
    this.nombre_cat2 = cat.nombre_categoria
    this.id_cat = cat.id;
    this.categoria.usuario_ = this.user.id;
    this.categoiresService.getSubCategoria(this.categoria).subscribe(
      res => {
        if (res == "vacio") {
          //console.log("No tiene Sub Carpetas");
          this.id_cat = 0;
          this.nombre_cat = '0';
        }
        else {
          //this.categoria = res;
          //console.log("Sub-Carpetas:");
          this.sub_categoria = res;
        }
      },
      err => console.error(err)
    );

    delete this.producto.id;
    delete this.producto.codigo;
    this.producto.categoria_ = cat.id;
    this.producto.usuario_ = this.user.id;
    this.productsService.getProducto(this.producto).subscribe(
      res=>{
        if (res == "vacio") {
          //console.log("No tiene Sub Carpetas");
          console.log("No hay productos");
          this.ver_pro = false;
        }
        else {
          //this.categoria = res;
          //console.log("Sub-Carpetas:");
          this.productos = res;
          this.ver_pro = true;
          console.log(this.productos);
        }
      },
      err => console.error(err)
    );
  }

  editCat(id){
    console.log(id);
    this.categoiresService.getUno(id).subscribe(
      res =>{
        console.log(res);
        this.categoria = res;
        this.edit = true;
      },
      err => console.log(err)
    );
  }

  regresar() {
    this.edit = false;
    this.vacio = false;
    this.vacio2 = false;
    this.view = false;
  }

  EditarCategoria(){
    this.categoiresService.putCategory(this.categoria.id, this.categoria).subscribe(
      res =>{
        this.showSuccess('Cambios Guardados con éxito!');
        this.edit = false;
        this.router.navigate(['/user']);
        location.reload();
        //this.ngOnInit();
      },
      err => console.log(err)
    );
  }

  deleteCat(id: string){
    console.log("Eliminando");
    console.log(id);
    
    this.categoiresService.deleteCategory(id).subscribe(
      res =>{

        for(let i=0; i<this.sub_categoria.length; i++){
          if(id == this.sub_categoria[i].padre){
            let id_ = this.sub_categoria[i].id;
            this.categoiresService.deleteCategory(id_).subscribe(
              res =>{
                console.log("Eliminado");
              },
              err => console.log(err)
            );
          }
        }
        this.showSuccess('Categoría eliminada con éxito!');
        location.reload();
      },
      err => console.log(err)
    );
    /*
    this.categoiresService.deleteCategory(id).subscribe(
      res =>{
        this.showSuccess('Categoría eliminada con éxito!');
        location.reload();
      },
      err => console.log(err)
    );*/
  }

  mostrar2(){
    this.view = true;
  }

  deleteProduct(id: string){
    this.productsService.deleteProduct(id).subscribe(
      res =>{
        this.showSuccess("Producto Eliminado");
        this.router.navigate(['/user']);
        location.reload();
      },
      err => {
        console.log(err);
        this.errorSucces("Error al eliminar el producto");
      }
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
