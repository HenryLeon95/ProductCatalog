import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioComponent } from './components/inicio/inicio.component';
import { AnonymousComponent } from './components/anonymous/anonymous.component';
import { PrivateComponent } from './components/private/private.component';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { LoginComponent } from './components/login/login.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { AccesDesignedComponent } from './components/acces-designed/acces-designed.component';
import { ProductoFormComponent } from './components/producto-form/producto-form.component';
import { AyudaComponent } from './components/ayuda/ayuda.component';

import { AuthGuard } from './auth.guard';
import { AuthClientGuard } from './auth-client.guard';
import { AuthHelpGuard } from './auth-help.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/start',
    pathMatch: 'full'
  },
  {
    path: 'start',
    component: InicioComponent
  },
  {
    path: 'private',
    component: PrivateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: RegistroUsuarioComponent
    //canActivate: [AuthGuard]
  },
  {
    path: 'modificar/usuario/:id',
    component: RegistroUsuarioComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user',
    component: UserMenuComponent,
    canActivate: [AuthClientGuard]
  },
  {
    path: 'user/edit/:id',
    component: UserFormComponent,
    canActivate: [AuthClientGuard]
  },
  {
    path: 'anonymous',
    component: AnonymousComponent
  },
  {
    path: 'products',
    component: AnonymousComponent
  },
  {
    path: 'acces-denied',
    component: AccesDesignedComponent
  },
  {
    path: 'categorys',
    component: CategoryListComponent,
    canActivate: [AuthClientGuard]
  },
  {
    path: 'product/edit/:id_pro',
    component: ProductoFormComponent,
    canActivate: [AuthClientGuard]
  },
  {
    path: 'help-desk',
    component: AyudaComponent,
    canActivate: [AuthHelpGuard]
  }
  // {
  //   path: '',
  //   redirectTo: '/employees',
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'employees',
  //   component: GameListComponent
  // },
  // {
  //   path: 'employees/add',
  //   component: GameFormComponent
  // },
  // {
  //   path: 'employees/edit/:id',
  //   component: GameFormComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
