import { Component, OnInit, HostBinding } from '@angular/core';
import { User } from '../../models/User'
import { UsersService } from '../../services/users.service';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Bitacora } from '../../models/Bitacora';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {

  //@HostBinding('class') classes = 'row';

  edit: boolean = false
  view: boolean = false
  ver0: boolean = false
  userForm: FormGroup;

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

  bitacora: Bitacora = {
    id: 0,
    usuario_: 0,
    destino_: 0,
    tipo: '',
    accion_: ''
  }

  constructor(private userService: UsersService, private router: Router,
    private activedRoute: ActivatedRoute, private toastr: ToastrService,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.edit = false;
    this.view = false;
    this.ver0 = false;

    this.userService.getUser(localStorage.getItem('id')).subscribe(
      res => {
        console.log(res);
        this.user = res;
        this.userForm = this.createFormGroup();
      },
      err => console.log(err)
    );

    const params = this.activedRoute.snapshot.params;
    if (params.id) {
      this.userService.getUser(params.id).subscribe(
        res => {
          console.log(res);
          this.user = res;
          //this.edit = true;
        },
        err => console.log(err)
      );
    }
  }

  createFormGroup() {
    return new FormGroup({
      nombre: new FormControl(this.user.nombre, [Validators.required]),
      apellido: new FormControl(this.user.apellido, [Validators.required]),
      telefono: new FormControl(this.user.telefono),
      clave: new FormControl(this.user.clave, [
        Validators.required,
        Validators.minLength(8),
        //Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'),
        Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=[^_$@$!%*?&({*/\.,\[\]\-+})]*[_$@$!%*?&({*/\.,\[\]\-+})]).{8,30}$/)
      ]),
      direccion: new FormControl(this.user.direccion)
    });
  }

  get nombre() {
    return this.userForm.get('nombre');
  }

  get apellido() {
    return this.userForm.get('apellido');
  }

  get clave() {
    return this.userForm.get('clave');
  }

  enviar() {
    this.view = true;
  }

  ocultar() {
    this.view = false;
  }

  onResetForm() {
    this.userForm.reset();
    this.userForm = this.createFormGroup();
  }

  LlenarUser() {
    this.user.nombre = this.userForm.get('nombre').value;
    this.user.apellido = this.userForm.get('apellido').value;
    this.user.clave = this.userForm.get('clave').value;
    this.user.direccion = this.userForm.get('direccion').value;
    if (this.userForm.get('telefono').value == '') {
      this.user.telefono = 0;
    }
    else {
      this.user.telefono = (this.userForm.get('telefono').value);
    }
  }

  updateUser() {
    if (this.userForm.valid) {
      delete this.user.correo;
      delete this.user.fotografia;
      delete this.user.fecha_registro;
      delete this.user.fecha_nacimiento;
      delete this.user.genero;
      delete this.user.credito_;
      delete this.user.ganancia;
      delete this.user.rol_;
      delete this.user.estado_;
      this.LlenarUser();
      this.onResetForm();
      this.userService.updateUser(this.user.id, this.user).subscribe(
        res => {
          delete this.bitacora.id;
          this.bitacora.usuario_ = this.user.id;
          this.bitacora.destino_ = this.user.id;
          this.bitacora.tipo = "Modificación de Usuario";
          this.bitacora.accion_ = "Usuario ha modificado sus datos";
          this.userService.addBitacora(this.bitacora).subscribe(
            res => {
              console.log("Bitacora Agregada");
            },
            err => console.log("Error en la bitacora")
          );
          this.showSuccess('Cambios Guardados con éxito!');
          this.router.navigate(['/user']);
          this.ngOnInit();
        },
        err => console.log(err)
      );
    }
    else {
      this.errorSucces('Verifique sus datos');
    }
    //Al actualizar, hay que eliminar la fecha de creación
  }

  deleteUser(id: string) {
    if (this.userForm.valid) {
      delete this.user.nombre;
      delete this.user.apellido;
      delete this.user.telefono;
      delete this.user.clave;
      delete this.user.direccion;
      delete this.user.fecha_registro;
      delete this.user.fecha_nacimiento;
      delete this.user.correo;
      delete this.user.fotografia;
      delete this.user.genero;
      delete this.user.credito_;
      delete this.user.ganancia;
      delete this.user.rol_;
      this.LlenarUser();
      this.user.estado_ = 2;
      this.userService.updateStatus(this.user.id, this.user).subscribe(
        res => {
          delete this.bitacora.id;
          this.bitacora.usuario_ = this.user.id;
          this.bitacora.destino_ = this.user.id;
          this.bitacora.tipo = "Modificación de Usuario";
          this.bitacora.accion_ = "Ha eliminado su cuenta";
          this.userService.addBitacora(this.bitacora).subscribe(
            res => {
              console.log("Bitacora Agregada");
            },
            err => console.log("Error en la bitacora")
          );
          this.showSuccess('Se ha dado de baja!!');
          this.authService.logout();
        },
        err => console.log(err)
      );
    }
    else {
      this.errorSucces('No se puede dar de baja');
    }
    /*
    this.gamesService.deleteGame(id).subscribe(
      res =>{
        console.log(res);
        this.getGames();
      },
      err => console.log(err)
    );*/
  }

  ver1(){
    this.ver0 = !this.ver0;
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
