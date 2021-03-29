import { Component, OnInit, HostBinding } from '@angular/core';
import { Game } from '../../models/Game';
import { GamesService } from '../../services/games.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  edit: boolean = false;
  game: Game = {
    id: 0,
    nombre: ''
  };

  constructor(private gamesService: GamesService, private router: Router, private activedRoute: ActivatedRoute) { }

  ngOnInit() {
    const params= this.activedRoute.snapshot.params;
    //console.log(params);

    if(params.id){
      this.gamesService.getGame(params.id).subscribe(
        res =>{
          console.log(res);
          this.game = res;
          this.edit = true;
        },
        err => console.log(err)
      )
    }
  }

  saveNewGame(){
    delete this.game.id;
    
    this.gamesService.saveGame(this.game).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/employees']);
      },
      err => console.error(err)
    );
  }

  updateGame(){
    //Al actualizar, hay que eliminar la fecha de creación
    console.log(this.game);
    this.gamesService.updateGame(this.game.id, this.game).subscribe(
      res =>{
        console.log(res);
        this.router.navigate(['/employees']);
      },
      err => console.log(err)
    );
  }

}
