import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game } from '../models/Game';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  API_URI = 'http://localhost:3000/api'//Aquí hacemos la petición para la Api-Rest

  constructor(private http: HttpClient) { }

  getGames(){
    return this.http.get(`${this.API_URI}/employees`);
  }

  getGame(id: string){
    return this.http.get(`${this.API_URI}/employees/${id}`);
  }

  deleteGame(id: string){
    return this.http.delete(`${this.API_URI}/employees/${id}`)
  }

  saveGame(game: Game){
    return this.http.post(`${this.API_URI}/employees`, game);
  }

  //updateGame(id: string | number, updateGame: Game): Observable<Game>{
  updateGame(id: string | number, updateGame: Game){
    return this.http.put(`${this.API_URI}/employees/${id}`, updateGame);
  }
}
