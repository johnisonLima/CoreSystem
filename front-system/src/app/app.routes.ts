import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ''
  },
  {
    path: '',
    loadChildren: () => import('./modulos/usuarios/usuarios.routes').then(m => m.usuariosRoutes)
  }
];
