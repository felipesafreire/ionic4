import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './page/home/home.module#HomePageModule' },
  { path: 'cidade/:idCidade', loadChildren: './page/cidade/cidade.module#CidadePageModule' },
  { path: '', loadChildren: './page/tab/tab.module#TabPageModule' },
  // { path: 'financeiro', loadChildren: './page/financeiro/financeiro.module#FinanceiroPageModule' },
  // { path: 'vendas', loadChildren: './page/vendas/vendas.module#VendasPageModule' },
  // { path: 'servicos', loadChildren: './page/servicos/servicos.module#ServicosPageModule' },
  // { path: 'opcoes', loadChildren: './page/opcoes/opcoes.module#OpcoesPageModule' },
  // { path: 'conta-corrente', loadChildren: './page/conta-corrente/conta-corrente.module#ContaCorrentePageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
