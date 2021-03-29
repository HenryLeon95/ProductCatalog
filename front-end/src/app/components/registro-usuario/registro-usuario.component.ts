import { Component, OnInit, HostBinding } from '@angular/core';
import { User } from '../../models/User';
import { Genero } from '../../models/Generos';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UploadService } from '../../services/upload.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {

  //@HostBinding('class') classes = 'row';

  edit: boolean = false;
  verr: boolean = false;
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
    estado_: 0,
    fecha_nacimiento: new Date()
  };
  userForm: FormGroup;
  generos: Genero[] = [];
  seleccionado: Genero = new Genero("M", "Masculino");
  uploadedFile: Array<File>;
  private image: ImaggeSelected = null;
  hora_registro: Date = new Date();
  contador: number = 0;
  codigo: string;
  cod_temp: string;

  constructor(private router: Router, private activedRoute: ActivatedRoute,
    private toastr: ToastrService, private uploadService: UploadService,
    private userService: UsersService) {
    this.userForm = this.createFormGroup();
  }

  ngOnInit() {
    this.generos.push(new Genero("M", "Masculino"));
    this.generos.push(new Genero("F", "Femenino"));

    const params = this.activedRoute.snapshot.params;
    if(params.id){
      this.userService.getUser(params.id).subscribe(
        res =>{
          console.log(res);
          this.user = res;
          this.edit = true;
          this.userForm = this.createFormGroup();
        },
        err => console.log(err)
      )
    }
  }

  createFormGroup() {
    return new FormGroup({
      nombre: new FormControl(this.user.nombre, [Validators.required]),
      apellido: new FormControl(this.user.apellido, [Validators.required]),
      correo: new FormControl(this.user.correo, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/)
      ]),
      confirm_clave: new FormControl(this.user.clave),
      clave: new FormControl(this.user.clave, [
        Validators.required,
        Validators.minLength(8),
        //Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'),
        Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=[^_$@$!%*?&({*/\.,\[\]\-+})]*[_$@$!%*?&({*/\.,\[\]\-+})]).{8,30}$/)
      ]),
      //fotografia: new FormControl(''),
      telefono: new FormControl(this.user.telefono),
      genero: new FormControl(this.user.genero),
      direccion: new FormControl(this.user.direccion),
      fecha_nacimiento: new FormControl(this.user.fecha_nacimiento)
    });
  }

  compararGeneros(genero1: Genero, genero2: Genero) {
    if (genero1 == null || genero2 == null) {
      return false;
    }
    return genero1.descripcion === genero2.descripcion;
  }

  private compararClave(): boolean {
    const pass = this.userForm.get('clave').value;
    const pass2 = this.userForm.get('confirm_clave').value;

    return pass === pass2 ? true : false;
  }

  saveUser() {
    if (this.userForm.valid) {
      delete this.user.id;
      this.LlenarUser();
      console.log(this.user);
      this.onResetForm();
      this.verr = true;
      this.onUpload();
      this.obtenerTiempo();
      this.cod_temp = this.generarCodigoValidacion();
      console.log(this.cod_temp);
      this.EnviarEmail();
    }
    else {
      this.verr = false;
      console.log('No valido');
      this.errorSucces('Verifique sus datos');
    }
  }

  generarCodigoValidacion() {
    let result = "";
    let codigo = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let tamano = codigo.length;
    for (let i = 0; i < 8; i++) {
      result += codigo.charAt(Math.floor(Math.random() * tamano));
    }
    return result;
  }

  obtenerTiempo() {
    this.contador = this.hora_registro.getHours() * 60 + this.hora_registro.getMinutes();
    console.log(this.contador);
  }

  Validar_Tiempo() {
    this.hora_registro = new Date();
    if (((this.hora_registro.getHours() * 60 + this.hora_registro.getMinutes()) - this.contador) < 5) {
      if (this.codigo == this.cod_temp) {
        this.verr = false;
        this.userService.saveUser(this.user).subscribe(res => {
          this.showSuccess('Creación Completa. Ya puede acceder con sus credenciales!');
          this.router.navigate(['/login']);
        },
          err => console.error(err)
        );
      }
      else {
        this.warnigSucces('Verifique su código');
      }
    }
    else {
      this.verr = false;
      this.errorSucces('El tiempo ha expirado');
      console.log("El tiemp ha expirado");
      this.router.navigate(['/signup']);
    }
  }

  LlenarUser() {
    this.user.nombre = this.userForm.get('nombre').value;
    this.user.apellido = this.userForm.get('apellido').value;
    this.user.clave = this.userForm.get('clave').value;
    this.user.correo = this.userForm.get('correo').value;
    //this.user.fotografia = this.userForm.get('fotografia').value;
    this.user.fecha_nacimiento = this.userForm.get('fecha_nacimiento').value;
    this.user.direccion = this.userForm.get('direccion').value;
    this.user.rol_ = 3;
    this.user.estado_ = 1;
    this.user.genero = this.seleccionado.nombre;
    this.user.credito_ = this.aleatorio(1, 5);
    if (this.userForm.get('telefono').value == '') {
      this.user.telefono = 0;
    }
    else {
      this.user.telefono = (this.userForm.get('telefono').value);
    }
  }

  private aleatorio(minimo, maximo): number {
    return Math.floor(Math.random() * ((maximo + 1) - minimo) + minimo);
  }

  onResetForm() {
    this.userForm.reset();
  }

  //-----------------------------------------Sección de Verificación-------------------------------
  ver(): boolean {
    if (!this.userForm.valid) {
      this.verr = false;
      this.errorSucces('Verifique sus datos');
    }
    else {
      this.verr = true;
    }
    return this.verr;
  }

  //-----------------------------------------Sección de EMAIL-------------------------------
  EnviarEmail() {
    console.log('Enviando email');
    this.uploadService.sendEmail(this.user.correo, this.cod_temp).subscribe((res) => {
      console.log('Response:', res);
    });
  }

  //-----------------------------------------Sección de Imágenes-----------------------------------
  onUpload() {
    if (this.image != null) {
      console.log('Enviando Fotografía');
      this.uploadService.saveFile(this.image.image, this.image.name).subscribe((res) => {
        console.log('Response:', res);
      });
    }
  }

  CambiarFile(e) {
    this.image = new ImaggeSelected;
    this.image.image = e.src;
    this.image.name = e.file.name;
    this.user.fotografia = this.image.name.toString();
    console.log(this.image.name);
  }

  //-----------------------------------------Sección de Verificación-------------------------------
  get nombre() {
    return this.userForm.get('nombre');
  }

  get apellido() {
    return this.userForm.get('apellido');
  }

  get correo() {
    return this.userForm.get('correo');
  }

  get clave() {
    return this.userForm.get('clave');
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