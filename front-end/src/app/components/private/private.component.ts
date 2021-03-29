import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { UploadService } from '../../services/upload.service';
import { ToastrService } from 'ngx-toastr';
import { Roles, Estados, Creditos, Selecciones } from '../../models/Generos';
import { Bitacora } from '../../models/Bitacora';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})
export class PrivateComponent implements OnInit {

  view: boolean = false;
  id_logueado: number;
  nombre_rol: string;
  nombre_estado: string;
  nombre_credito: string;
  descripcion: string;

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

  bitacora: Bitacora ={
    id: 0,
    usuario_: 0,
    destino_: 0,
    tipo: '',
    accion_: ''
  }

  roles: Roles[] = [];
  rol_seleccionado: Roles = new Roles(3, "Cliente");
  estados: Estados[] = [];
  estado_seleccionado: Estados = new Estados(1, "Activar Cuenta");
  creditos: Creditos[] = [];
  credito_seleccionado: Creditos = new Creditos(1, "Diamante", "Q.50000");
  seleccion: Selecciones[] = [];
  seleccionado: Selecciones = new Selecciones("Cambiar Rol");

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private userService: UsersService, private toastr: ToastrService,
    private uploadService: UploadService) { }

  ngOnInit() {
    this.roles.push(new Roles(1, "Administrador"));
    this.roles.push(new Roles(2, "Servicio de Ayuda"));
    this.roles.push(new Roles(3, "Cliente"));

    this.estados.push(new Estados(1, "Activar Cuenta"));
    this.estados.push(new Estados(2, "Congelar Cuenta"));
    this.estados.push(new Estados(3, "Dar de Baja"));

    this.creditos.push(new Creditos(1, "Diamante", "Q.50000"));
    this.creditos.push(new Creditos(2, "Platino", "Q25000"));
    this.creditos.push(new Creditos(3, "Oro", "Q10000"));
    this.creditos.push(new Creditos(4, "Plata", "Q5000"));
    this.creditos.push(new Creditos(5, "Bronce", "Q1000"));

    this.seleccion.push(new Selecciones("Cambiar Rol"));
    this.seleccion.push(new Selecciones("Cambiar Estado"));
    this.seleccion.push(new Selecciones("Cambiar Crédito"));

    this.view = false;
    this.id_logueado = parseInt(localStorage.getItem('id'));
    // const params= this.activatedRoute.snapshot.params;
    // this.user.id = params.id;
  }

  llenarUser() {
    console.log(this.user);
    this.userService.buscarUser(this.user).subscribe(res => {
      this.user = res[0];
      this.showSuccess("Usuario Encontrado");
      console.log(this.user);
      this.view = true;

      if (this.user.rol_ === 1) {
        this.nombre_rol = 'Administrador'
      }
      else if (this.user.rol_ === 2) {
        this.nombre_rol = 'Servicio de Ayuda'
      }
      else if (this.user.rol_ === 3) {
        this.nombre_rol = 'Cliente'
      }

      if (this.user.estado_ === 1) {
        this.nombre_estado = 'Activo'
      }
      else if (this.user.estado_ === 2) {
        this.nombre_estado = 'Congelado'
      }
      else if (this.user.estado_ === 3) {
        this.nombre_estado = 'Dado de Baja'
      }

      if (this.user.credito_ === 1) {
        this.nombre_credito = 'Diamante - Q.50000'
      }
      else if (this.user.credito_ === 2) {
        this.nombre_credito = 'Platino - Q25000'
      }
      else if (this.user.credito_ === 3) {
        this.nombre_credito = 'Oro - Q10000'
      }
      else if (this.user.credito_ === 4) {
        this.nombre_credito = 'Plata - 5000'
      }
      else if (this.user.credito_ === 5) {
        this.nombre_credito = 'Bronce - 1000'
      }
      //this.router.navigate(['/modificar/usuario', this.user.id]);
    },
      err => {
        console.log(err);
        this.errorSucces("Usuario no Encontrado...");
      }
    );
  }

  Regresar() {
    this.user.correo = '';
    this.user.clave = '';
    this.view = false;
  }

  compararSeleccion(sele1: Selecciones, sele2: Selecciones) {
    if (sele1 == null || sele2 == null) {
      return false;
    }
    return sele1.descripcion === sele2.descripcion;
  }

  compararRol(sele1: Roles, sele2: Roles) {
    if (sele1 == null || sele2 == null) {
      return false;
    }
    return sele1.descripcion === sele2.descripcion;
  }

  compararEstado(sele1: Estados, sele2: Estados) {
    if (sele1 == null || sele2 == null) {
      return false;
    }
    return sele1.descripcion === sele2.descripcion;
  }

  compararCredito(sele1: Creditos, sele2: Creditos) {
    if (sele1 == null || sele2 == null) {
      return false;
    }
    return sele1.descripcion === sele2.descripcion;
  }

  CambioSelect(e) {
    console.log(this.seleccionado.descripcion);
  }

  updateEstado() {
    if (this.user.estado_ == 3) {
      this.errorSucces('Una cuenta de baja, ya no puede activarse.')
    }
    else {
      this.user.estado_ = this.estado_seleccionado.id;
      this.userService.updateStatus(this.user.id, this.user).subscribe(
        res => {
          this.showSuccess('Se ha cambiado el estado!!');
        },
        err => this.errorSucces('No se puede cambiar el estado!')
      );
    }

    delete this.bitacora.id;
    this.bitacora.usuario_ = this.id_logueado;
    this.bitacora.destino_ = this.user.id;
    this.bitacora.tipo = "Modificación de Estado";
    this.bitacora.accion_ = this.descripcion + " a: " + this.user.nombre + " " + this.user.apellido;
    this.userService.addBitacora(this.bitacora).subscribe(
      res=>{
        console.log("Bitacora Agregada");
      },
      err => console.log("Error en la bitacora")
    );

    this.Regresar();
  }

  updateRol() {
    this.user.rol_ = this.rol_seleccionado.id;
    const clave_temporal = this.user.clave;
    const correo_temporal = this.user.correo;
    this.userService.updateRol(this.user.id, this.user).subscribe(
      res => {
        if (this.user.rol_ == 1) {
          this.user.correo = correo_temporal;
          this.user.clave = clave_temporal;
          this.uploadService.sendEmail2(this.user.correo, this.user.clave).subscribe((res) => {
            console.log('Response:', res);
          });
        }
        else if (this.user.rol_ == 2) {
          this.user.correo = correo_temporal;
          this.user.clave = clave_temporal;
          this.uploadService.sendEmail3(this.user.correo, this.user.clave).subscribe((res) => {
            console.log('Response:', res);
          });
        }
        this.showSuccess('Se ha cambiado el Rol!!');
      },
      err => this.errorSucces('No se puede cambiar el Rol!')
    );
    
    this.bitacora.usuario_ = this.id_logueado;
    this.bitacora.destino_ = this.user.id;
    this.bitacora.tipo = "Modificación de rol";
    this.bitacora.accion_ = this.descripcion + " a: " + this.user.nombre + " " + this.user.apellido;
    this.userService.addBitacora(this.bitacora).subscribe(
      res=>{
        console.log("Bitacora Agregada");
      },
      err => console.log("Error en la bitacora")
    );

    this.Regresar();
  }

  updateCredit() {
    this.user.credito_ = this.credito_seleccionado.id;
    this.userService.updateCreit(this.user.id, this.user).subscribe(
      res => {
        this.showSuccess('Se ha cambiado el Crédito!!');
      },
      err => this.errorSucces('No se puede cambiar el Crédito!')
    );

    delete this.bitacora.id;
    this.bitacora.usuario_ = this.id_logueado;
    this.bitacora.destino_ = this.user.id;
    this.bitacora.tipo = "Modificación de crédito";
    this.bitacora.accion_ = this.descripcion + " a: " + this.user.nombre + " " + this.user.apellido;
    this.userService.addBitacora(this.bitacora).subscribe(
      res=>{
        console.log("Bitacora Agregada");
      },
      err => console.log("Error en la bitacora")
    );

    this.Regresar();
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
