import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { Producto } from '../../models//Producto';
import { Router, ActivatedRoute } from '@angular/router';
import { RepotsService } from '../../services/repots.service';
import { ToastrService } from 'ngx-toastr';
import { Selecciones } from '../../models/Generos';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  seleccion: Selecciones[] = [];
  seleccionado: Selecciones = new Selecciones("Reporte 1");
  reportes: any[];
  ver_repo: boolean = false;

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

  producto: Producto = {
    id: 0,
    codigo: '',
    nombre: '',
    imagen: '',
    descripcion: '',
    color: '',
    categoria_: 0,
    precio: 0,
    cantidad_disponible: 0,
    usuario_: 0
  };

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService,
    private reportsService: RepotsService) { }

  ngOnInit() {
    this.ver_repo = false;
    this.seleccion.push(new Selecciones("Reporte 1"));
    this.seleccion.push(new Selecciones("Reporte 2"));
    this.seleccion.push(new Selecciones("Reporte 3"));
    this.seleccion.push(new Selecciones("Reporte 4"));
    this.seleccion.push(new Selecciones("Reporte 5"));
    this.seleccion.push(new Selecciones("Reporte 6"));
    this.seleccion.push(new Selecciones("Reporte 7"));
    this.seleccion.push(new Selecciones("Reporte 8"));
    this.seleccion.push(new Selecciones("Reporte 9"));
    this.seleccion.push(new Selecciones("Reporte 10"));
    this.seleccion.push(new Selecciones("Reporte 11"));
    this.seleccion.push(new Selecciones("Reporte 12"));
  }

  compararSeleccion(sele1: Selecciones, sele2: Selecciones) {
    if (sele1 == null || sele2 == null) {
      return false;
    }
    return sele1.descripcion === sele2.descripcion;
  }

  crearReporte(numero) {
    if (numero == 2) {
      //borrar los datos que sirven para no llamar a otro select en el reporte
      this.reportsService.getReport(this.user).subscribe(
        res => {
          if (res == "vacio") {
            console.log("No hay Datos");
            this.ver_repo = false;
          }
          else {
            this.reportes = res;
            this.ver_repo = true;
            console.log(this.reportes);
            this.generarPDF("Reporte 2", 2);
          }
        },
        err => console.error(err)
      );
    }
    else if (numero == 3) {
      //borrar los datos que sirven para no llamar a otro select en el reporte
      this.reportsService.getReport3(this.user).subscribe(
        res => {
          if (res == "vacio") {
            console.log("No hay Datos");
            this.ver_repo = false;
          }
          else {
            this.reportes = res;
            this.ver_repo = true;
            console.log(this.reportes);
            this.generarPDF("Reporte 3", 3);
          }
        },
        err => console.error(err)
      );
    }
    else if (numero == 4) {
      //borrar los datos que sirven para no llamar a otro select en el reporte
      this.reportsService.getReport4(this.user).subscribe(
        res => {
          if (res == "vacio") {
            console.log("No hay Datos");
            this.ver_repo = false;
          }
          else {
            this.reportes = res;
            this.ver_repo = true;
            console.log(this.reportes);
            this.generarPDF("Reporte 4", 4);
          }
        },
        err => console.error(err)
      );
    }
    else if (numero == 7) {
      //borrar los datos que sirven para no llamar a otro select en el reporte
      this.reportsService.getReport7(this.user).subscribe(
        res => {
          if (res == "vacio") {
            console.log("No hay Datos");
            this.ver_repo = false;
          }
          else {
            this.reportes = res;
            this.ver_repo = true;
            console.log(this.reportes);
            this.generarPDF("Reporte 7", 7);
          }
        },
        err => console.error(err)
      );
    }
    else if (numero == 8) {
      //borrar los datos que sirven para no llamar a otro select en el reporte
      this.reportsService.getReport8(this.user).subscribe(
        res => {
          if (res == "vacio") {
            console.log("No hay Datos");
            this.ver_repo = false;
          }
          else {
            this.reportes = res;
            this.ver_repo = true;
            console.log(this.reportes);
            this.generarPDF("Reporte 8", 8);
          }
        },
        err => console.error(err)
      );
    }
    else if (numero == 10) {
      //borrar los datos que sirven para no llamar a otro select en el reporte
      this.reportsService.getReport10(this.producto).subscribe(
        res => {
          if (res == "vacio") {
            console.log("No hay Datos");
            this.ver_repo = false;
          }
          else {
            this.reportes = res;
            this.ver_repo = true;
            console.log(this.reportes);
            this.generarPDF("Reporte 10", 10);
          }
        },
        err => console.error(err)
      );
    }
    else if (numero == 12) {
      //borrar los datos que sirven para no llamar a otro select en el reporte
      this.reportsService.getReport12(this.user).subscribe(
        res => {
          if (res == "vacio") {
            console.log("No hay Datos");
            this.ver_repo = false;
          }
          else {
            this.reportes = res;
            this.ver_repo = true;
            console.log(this.reportes);
            this.generarPDF("Reporte 12", 12);
          }
        },
        err => console.error(err)
      );
    }
  }

  llenadoPDF(val: number): string {
    var vartable = '';

    if (val == 2) {
      vartable = `
      <table id='tableReport'>
        <tr>
            <td>Nombre</td>
            <td>Apellido</td>
            <td>Género</td>
            <td>Rol</td>
            <td 'width:150px'>Fecha de Nacimiento</td>
        </tr>`;

      for (let i = 0; i < this.reportes.length; i++) {
        vartable += ("<tr><td>" + this.reportes[i].nombre + "</td><td>" + this.reportes[i].apellido + "</td><td>"
          + "Marculino</td><td>Servicio de Ayuda</td><td>" + this.reportes[i].fecha_nacimiento + "</td></tr>");
      }
    }
    else if (val == 3) {
      vartable = `
      <table id='tableReport'>
        <tr>
            <td>Nombre</td>
            <td>Apellido</td>
            <td>Género</td>
            <td>Rol</td>
            <td 'width:150px'>Fecha de Nacimiento</td>
        </tr>`;

      for (let i = 0; i < this.reportes.length; i++) {
        vartable += ("<tr><td>" + this.reportes[i].nombre + "</td><td>" + this.reportes[i].apellido + "</td><td>"
          + "Femenino</td><td>Administrador</td><td>" + this.reportes[i].fecha_nacimiento + "</td></tr>");
      }
    }
    else if (val == 4) {
      vartable = `
      <table id='tableReport'>
        <tr>
            <td>Nombre</td>
            <td>Apellido</td>
            <td>Ganancias</td>
        </tr>`;

      for (let i = 0; i < this.reportes.length; i++) {
        vartable += ("<tr><td>" + this.reportes[i].nombre + "</td><td>" + this.reportes[i].apellido + "</td><td>"
          + this.reportes[i].ganancia + "</td></tr>");
      }
    }
    else if (val == 7) {
      vartable = `
      <table id='tableReport'>
        <tr>
            <td>Nombre</td>
            <td>Apellido</td>
            <td>Cantidad de Productos</td>
            <td>Rol</td>
        </tr>`;

        for (let i = 0; i < this.reportes.length; i++) {
          vartable += ("<tr><td>" + this.reportes[i].nombre + "</td><td>" + this.reportes[i].apellido + "</td><td>"
            + this.reportes[i].CANTIDAD + "</td><td>Cliente</td></tr>");
        }
    }
    else if (val == 8) {
      vartable = `
      <table id='tableReport'>
        <tr>
            <td>Código</td>
            <td>Nombre</td>
            <td>Categoría</td>
        </tr>`;

        for (let i = 0; i < this.reportes.length; i++) {
          vartable += ("<tr><td>" + this.reportes[i].CODIGO + "</td><td>" + this.reportes[i].nombre + "</td><td>"
            + this.reportes[i].nombre_categoria + "</td></tr>");
        }
    }
    else if (val == 10) {
      vartable = `
      <table id='tableReport'>
        <tr>
            <td>Código</td>
            <td>Nombre</td>
            <td>Cantidad Disponible</td>
            <td>Precio</td>
        </tr>`;

        for (let i = 0; i < this.reportes.length; i++) {
          vartable += ("<tr><td>" + this.reportes[i].codigo + "</td><td>" + this.reportes[i].nombre + "</td><td>"
            + this.reportes[i].cantidad_disponible + "</td><td>" + this.reportes[i].precio + "</td></tr>");
        }
    }
    else if (val == 12) {
      vartable = `
      <table id='tableReport'>
        <tr>
            <td>Nombre</td>
            <td>Apellido</td>
            <td>Tipo</td>
            <td>Descripción</td>
            <td>Fecha</td>
        </tr>`;

        for (let i = 0; i < this.reportes.length; i++) {
          vartable += ("<tr><td>" + this.reportes[i].nombre + "</td><td>" + this.reportes[i].apellido + "</td><td>"
            + this.reportes[i].tipo + "</td><td>" + this.reportes[i].accion_ + "</td><td>" + this.reportes[i].fecha + "</td></tr>");
        }
    }

    vartable += "</table>";
    return vartable;
  }

  generarPDF(nombre: string, val: number) {
    var vartable = this.llenadoPDF(val);

    vartable += "</table>";

    const doc = new jsPDF('p', 'pt', 'letter'),
      source = vartable
      , specialElementHandlers = {
        // element with id of "bypass" - jQuery style selector
        '#bypassme': function (element, renderer) {
          // true = "handled elsewhere, bypass text extraction"
          return true;
        }
      },
      margins = {
        top: 30,
        bottom: 40,
        left: 35,
        width: 1000
      };
    doc.text(275, 25, nombre);

    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(8);
    doc.fromHTML(
      source // HTML string or DOM elem ref.
      , margins.left // x coord
      , margins.top // y coord
      , {
        'width': margins.width // max width of content on PDF
        , 'elementHandlers': specialElementHandlers
      },
      function (dispose) {
        // dispose: object with X, Y of the last line add to the PDF
        //          this allow the insertion of new lines after html
        doc.save("Reporte.pdf");
      },
      margins
    );
    /*
    html2canvas(document.getElementById('contenido'), {
      allowTaint: true,
      useCORS: true,
      scale: 1
    }).then(function(canvas){
      var img = canvas.toDataURL("image/png");
      var doc = new jsPDF();
      doc.addImage(img,'PNG',7, 20, 195, 105);
      doc.save('reporte.pdf');
    });*/
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
