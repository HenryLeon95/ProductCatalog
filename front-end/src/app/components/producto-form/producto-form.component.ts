import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service'
import { ProductsService } from '../../services/products.service'
import { User } from '../../models/User'
import { Category } from '../../models/Category'
import { Producto } from '../../models/Producto'
import { UsersService } from '../../services/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Eleccion_Categoria } from '../../models/Generos';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css']
})
export class ProductoFormComponent implements OnInit {

  edit: boolean = false;
  una_categoria: any = [];
  seleccion: Eleccion_Categoria[] = [];
  seleccionado: Eleccion_Categoria = new Eleccion_Categoria(0, "null");
  vacio: boolean = false;
  private image: ImaggeSelected = null;

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

  categoria: Category = {
    id: 0,
    nombre_categoria: '',
    descripcion: '',
    padre: null,
    usuario_: 0
  };

  constructor(private userService: UsersService, private router: Router, private activedRoute: ActivatedRoute,
    private categoiresService: CategoriesService, private toastr: ToastrService, private uploadService: UploadService,
    private productoService: ProductsService) { }

  ngOnInit() {
    this.edit = false;
    this.seleccion.push(new Eleccion_Categoria(0, "null"));

    const params= this.activedRoute.snapshot.params;
    //console.log(params);

    if(params.id_pro){
      delete this.producto.codigo;
      delete this.producto.categoria_;
      delete this.producto.usuario_;
      this.producto.id = params.id_pro;
      this.productoService.getProducto(this.producto).subscribe(
        res =>{
          console.log("reciviendo");
          console.log(res);
          this.producto = res[0];
          this.edit = true;
        },
        err => console.log(err)
      )
    }

    this.userService.getUser(localStorage.getItem('id')).subscribe(
      res => {
        this.user = res;
        this.categoria.usuario_ = this.user.id;
        this.getCategories();
      },
      err => console.log(err)
    );
  }

  agregarProducto() {
    if (this.producto.nombre == '' || this.producto.codigo == '') {
      this.warnigSucces("Debe llenar los campos obligatorios");
    }
    else if (this.seleccionado.padre == 0) {
      this.warnigSucces("Debe escoger una categoraía, o crear una");
    }
    else {
      this.producto.categoria_ = this.seleccionado.padre;
      delete this.producto.id;
      this.producto.usuario_ = this.user.id;
      console.log("enviando");
      console.log(this.producto);
      this.productoService.saveProduct(this.producto).subscribe(
        res => {
          this.onUpload();
          this.showSuccess('Se ha creado el Producto!');
          this.router.navigate(['/user']);
          location.reload();
          //this.ngOnInit();
        },
        err => {
          this.showSuccess('No se ha podido crear el Producto');
          console.log(err);
        }
      );
    }
  }

  getCategories() {
    delete this.categoria.padre;
    this.categoiresService.getCategoria(this.categoria).subscribe(
      res => {
        if (res == "vacio") {
          this.vacio = true;
        }
        else {
          this.una_categoria = res;
          for (let i = 0; i < this.una_categoria.length; i++) {
            console.log(this.una_categoria[i]);
            this.seleccion.push(new Eleccion_Categoria(this.una_categoria[i].id, this.una_categoria[i].nombre_categoria));
          }
          this.vacio = false;
        }
      },
      err => console.error(err)
    );
  }

  compararSeleccion(sele1: Eleccion_Categoria, sele2: Eleccion_Categoria) {
    if (sele1 == null || sele2 == null) {
      return false;
    }
    return sele1.descripcion === sele2.descripcion;
  }

  editarProducto(){
    this.productoService.putProduct(this.producto.id, this.producto).subscribe(
      res =>{
        this.showSuccess('Cambios Guardados con éxito!');
        this.edit = false;
        this.router.navigate(['/user']);
      },
      err => {
        console.log(err);
        this.errorSucces("Error al actualizar los datos");
      }
    );
  }


  //-----------------------------------------Sección de Imágenes-----------------------------------
  onUpload() {
    if (this.image != null) {
      this.uploadService.saveFile(this.image.image, this.image.name).subscribe((res) => {
      });
    }
  }

  CambiarFile(e) {
    this.image = new ImaggeSelected;
    this.image.image = e.src;
    this.image.name = e.file.name;
    this.producto.imagen = this.image.name.toString();
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

class ImaggeSelected {
  public name: String;
  public image: String;
}