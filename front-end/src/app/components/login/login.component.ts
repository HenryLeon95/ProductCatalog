import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../models/User';
import { UploadService } from '../../services/upload.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  veer: boolean = false;
  veer2: boolean = false;
  hora_registro: Date = new Date();
  contador: number = 0;
  correo: string;
  clave_temp: string;
  clave: string;
  id: string;
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

  constructor(private authService: AuthService, private router: Router,
    private toastr: ToastrService, private uploadService: UploadService,
    private userService: UsersService) { }

  ngOnInit() {
    this.veer = false;
    this.veer2 = false;
  }

  signIn() {
    this.authService.signIn(this.user).subscribe(
      res => {
        this.user = res.user[0];
        console.log(this.user);
        if (this.user.estado_ === 2 || this.user.estado_ === 3) {
          this.errorSucces2();
        }
        else {
          localStorage.setItem('token', res.token);
          localStorage.setItem('id', this.user.id.toString());
          localStorage.setItem('rol', this.user.rol_.toString());

          if (this.user.rol_ === 1) {   //ADMINISTRADOR
            this.showSuccess(this.user.nombre);
            //this.router.navigate(['/private', this.user.id]);
            this.router.navigate(['/private']);
          }
          else if(this.user.rol_ === 2){
            console.log("AYUDA")
            this.showSuccess(this.user.nombre);
            this.router.navigate(['/help-desk']);
          }
          else if (this.user.rol_ === 3) {  //CLIENTE
            console.log("CLIENTE");
            this.showSuccess(this.user.nombre);
            this.router.navigate(['/user']);
            //this.router.navigate(['/user/edit', this.user.id]);
          }
        }
      },
      err => {
        console.log(err);
        this.errorSucces();
      }
    );
  }

  obtenerTiempo() {
    this.contador = this.hora_registro.getHours() * 60 + this.hora_registro.getMinutes();
    console.log(this.contador);
  }

  generarCodigoValidacion() {
    let result = "";
    let codigo_min = 'abcdefghijklmnopqrstuvwxyz';
    let codigo_may = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let codigo_num = '0123456789';
    for (let i = 0; i < 3; i++) {
      result += codigo_min.charAt(Math.floor(Math.random() * codigo_min.length));
    }
    result += "_";
    for (let i = 0; i < 3; i++) {
      result += codigo_may.charAt(Math.floor(Math.random() * codigo_may.length));
    }
    for (let i = 0; i < 2; i++) {
      result += codigo_num.charAt(Math.floor(Math.random() * codigo_num.length));
    }
    return result;
  }

  activar() {
    this.veer = true;
  }

  restore() {
    delete this.user.fotografia;
    delete this.user.telefono;
    delete this.user.direccion;
    delete this.user.fecha_registro;
    delete this.user.fecha_nacimiento;
    delete this.user.genero;
    delete this.user.credito_;
    delete this.user.ganancia;
    delete this.user.rol_;
    delete this.user.estado_;
    this.veer2 = true;
    this.veer = false;
    this.obtenerTiempo();
    this.user.clave = this.generarCodigoValidacion();
    this.uploadService.sendEmail(this.user.correo, this.user.clave).subscribe((res) => {
      //console.log('Response:', res);
      this.id = "4";
      this.userService.updatePassword(this.user).subscribe(res => {
        this.warnigSucces('Tiene 2 minutos para ingresar con su nueva clave');
        console.log("Tiene 2 minutos para ingresar");
        this.clave_temp = res['clave'];
        //console.log(this.clave_temp);
      },
        err => console.error("No se hizo el SAVEPOINT")
      );
    });

  }

  regresar() {
    this.veer = false;
    this.veer2 = false;
  }

  validar() {
    this.hora_registro = new Date();
    if (((this.hora_registro.getHours() * 60 + this.hora_registro.getMinutes()) - this.contador) < 2) {
      if (this.user.clave == this.clave) {
        this.veer2 = false;
        console.log(this.user);
        this.showSuccess2('Se ha cambiado su clave!');
        this.router.navigate(['/login']);
        this.ngOnInit();
      }
      else {
        this.warnigSucces('Verifique su código');
      }
    }
    else {
      this.veer2 = false;
      this.veer = false;
      this.user.clave = this.clave_temp;
      this.userService.updatePassword(this.user).subscribe(res => {
      },
        err => console.error("No se hizo el SAVEPOINT")
      );
      this.errorSucces3();
      console.log("El tiemp ha expirado");
      this.router.navigate(['/login']);
      this.ngOnInit();
      this.user.clave = '';
    }
  }

  showSuccess(tipo: string) {
    this.toastr.success('Bienvenido: ' + tipo, 'Éxito!');
  }
  showSuccess2(mensaje: string) {
    this.toastr.success(mensaje, 'Éxito!');
  }

  errorSucces() {
    this.toastr.error('Verifique sus datos', 'Error!');
  }

  errorSucces2() {
    this.toastr.error('Cuenta no Activa', 'Error!');
  }

  errorSucces3() {
    this.toastr.error('El tiempo ha expirado.', 'Error!');
  }

  warnigSucces(mensaje: string) {
    this.toastr.warning(mensaje, 'Atención!');
  }


}
