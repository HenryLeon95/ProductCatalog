import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-acces-designed',
  templateUrl: './acces-designed.component.html',
  styleUrls: ['./acces-designed.component.css']
})
export class AccesDesignedComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  funcionAsociadaBoton() {
    this.location.back();
  }

}
