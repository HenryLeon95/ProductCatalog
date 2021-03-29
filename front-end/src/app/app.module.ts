import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { PaginatePipe } from './pipes/paginate.pipe';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImageUploadModule } from 'angular2-image-upload';

import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { GameFormComponent } from './components/game-form/game-form.component';
import { GameListComponent } from './components/game-list/game-list.component';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { LoginComponent } from './components/login/login.component';
import { AnonymousComponent } from './components/anonymous/anonymous.component';
import { PrivateComponent } from './components/private/private.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { UploadComponent } from './components/upload/upload.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { AccesDesignedComponent } from './components/acces-designed/acces-designed.component';
 
import { GamesService } from './services/games.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { UploadService } from './services/upload.service';
import { UsersService } from './services/users.service';
import { CategoriesService } from './services/categories.service';
import { ProductsService } from './services/products.service';
import { RepotsService } from './services/repots.service';

import { AuthGuard } from './auth.guard';
import { AuthClientGuard } from './auth-client.guard';
import { AuthHelpGuard } from './auth-help.guard';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { ProductoFormComponent } from './components/producto-form/producto-form.component';
import { ReportComponent } from './components/report/report.component';
import { AyudaComponent } from './components/ayuda/ayuda.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    GameFormComponent,
    GameListComponent,
    RegistroUsuarioComponent,
    LoginComponent,
    AnonymousComponent,
    PrivateComponent,
    InicioComponent,
    PaginatePipe,
    UploadComponent,
    UserFormComponent,
    UserMenuComponent,
    AccesDesignedComponent,
    CategoryListComponent,
    ProductoFormComponent,
    ReportComponent,
    AyudaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ImageUploadModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 2500,
      positionClass: 'toast-top-center',
      preventDuplicates: true
    })
  ],
  providers: [
    GamesService,
    UploadService,
    UsersService,
    CategoriesService,
    ProductsService,
    RepotsService,
    AuthClientGuard,
    AuthHelpGuard,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
