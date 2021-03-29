import { Component, OnInit, HostBinding } from '@angular/core';

import { GamesService } from '../../services/games.service'

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  games: any = [];
  @HostBinding('class') classes = 'row';

  constructor(private gamesService: GamesService) { }

  ngOnInit() {
    this.getGames();
  }

  getGames(){
    this.gamesService.getGames().subscribe(
      res => {
        console.log(res);
        this.games = res;
      },
      //res => console.log(res),
      err => console.error(err)
    )
  }

  deleteGame(id: string){
    this.gamesService.deleteGame(id).subscribe(
      res =>{
        console.log(res);
        this.getGames();
      },
      err => console.log(err)
    );
  }

}
