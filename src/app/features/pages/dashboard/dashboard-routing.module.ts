import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HistoricoComponent } from './historico/historico.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'historico',
    component: HistoricoComponent,
  },
  // {
  //   path: 'cardapio',
  //   component: CardapioComponent,
  // },
  // {
  //   path: 'usuarios',
  //   component: UsuariosComponent,
  // },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
