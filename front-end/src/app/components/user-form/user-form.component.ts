import { Component, OnInit, HostBinding } from '@angular/core';
import { User } from '../../models/User';
import { UsersService } from '../../services/users.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  //@HostBinding('class') classes = 'row';

  edit: boolean = false;
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

  constructor(private userService: UsersService, private router: Router, private activedRoute: ActivatedRoute) { }


  ngOnInit() {
    this.userService.getUser(localStorage.getItem('id')).subscribe(
      res => {
        console.log(res);
        this.user = res;
        //this.edit = true;
      },
      err => console.log(err)
    );

    const params = this.activedRoute.snapshot.params;
    //console.log(params);

    if (params.id) {/*
      this.gamesService.getGame(params.id).subscribe(
        res =>{
          console.log(res);
          this.game = res;
          this.edit = true;
        },
        err => console.log(err)
      )*/
      console.log(params);
    }
  }

  updateUser() {
    //Al actualizar, hay que eliminar la fecha de creación
    console.log(this.user);/*
    this.gamesService.updateGame(this.game.id, this.game).subscribe(
      res =>{
        console.log(res);
        this.router.navigate(['/employees']);
      },
      err => console.log(err)
    );*/
  }

}
