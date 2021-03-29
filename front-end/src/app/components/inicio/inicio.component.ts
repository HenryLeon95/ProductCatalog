import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  mision: String = "";
  vision: String = "";
  about_me: String = "";
  mostrarDatos: number = -1;
  edit: boolean = false;

  constructor(private userService: UsersService) { }

  ngOnInit() {
    if(localStorage.getItem('rol') != null){
      if(localStorage.getItem('rol') == "1"){
        this.edit = true;
      }
    }
    else{
      this.edit = false;
    }

    this.mision = `En Alie-sell buscamos satisfacer las necesidades de compra que todos tenemos, también
    ayudarle a vender los productos que el usuario desee, brindando originalidad y calidad.
    \n\nContamos con un equipo de trabajo altamente capacitado, con la mejor aptitud de servicio,
    sentido de la responsabilidad y ética, que busca dar un buen servicio y de calidad en el mejor
    tiempo posible.`;
    this.vision = `En Alie-sell deseamos que tanto grandes como pequeños empresarios se inicien en el mundo
    digital de las ventas y compras. \n
    Queremos ser una de las empresas líder en el mercado online.
    \n\nDesarrollaremos ofertas con los mejores productos, en la que encontrarás nuestro apoyo y la
    solución, de una manera fácil, cómoda y segura, buscando constantemente nuevas alternativas,
    basados en el conocimiento profundo de las necesidades de nuestros clientes.`;
    this.about_me = `Alie-sell es una empresa que se dedica a administrar usuarios para que puedan vender y comprar
    los productos que ellos deseen.
    También ofrece a los usuarios una experiencia intuitiva para el proceso de ventas y compras;
    y así generar su propio inventario y contabilizar sus propias ganancias.\nAlie-sell se diferenia de otros competidores gracias a la interacción entre ellos y un servicio
    de ayuda, que está activo durante todo el día, los 7 días a la semana.
    Ofreciendo una mayor confianza para nuestros clientes al momento de gestionar cualquier acción
    que ellos deseen.`;
  }

  avtivarDatos(mostrarDatos): void{
    this.mostrarDatos = mostrarDatos;
    document.querySelector(".recuadro").classList.toggle("ocultar");
  }

  guardar(){
    this.edit = false;
  }

}
