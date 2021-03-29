import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RepotsService {

  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getReport(repo){
    return this.http.post<any>(this.API_URI + '/report', repo);
  }

  getReport3(repo){
    return this.http.post<any>(this.API_URI + '/report3', repo);
  }

  getReport4(repo){
    return this.http.post<any>(this.API_URI + '/report4', repo);
  }

  getReport7(repo){
    return this.http.post<any>(this.API_URI + '/report7', repo);
  }

  getReport8(repo){
    return this.http.post<any>(this.API_URI + '/report8', repo);
  }

  getReport10(repo){
    return this.http.post<any>(this.API_URI + '/report10', repo);
  }

  getReport12(repo){
    return this.http.post<any>(this.API_URI + '/report12', repo);
  }
}
