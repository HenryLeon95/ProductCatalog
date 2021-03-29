import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'front-end';

  constructor(private authService: AuthService, private toastr: ToastrService){};

  showSuccess(){
    this.toastr.success('HOla', 'Success!');
  }

  errorSucces(){
    this.toastr.error('Hola', 'Error!');
  }

  infoSucces(){
    this.toastr.info('Hola', 'Info!');
  }

  warnigSucces(){
    this.toastr.warning('Hola', 'Warnig!');
  }
}
