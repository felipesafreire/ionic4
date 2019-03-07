import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabPage } from './tab.page';

const routes: Routes = [
  {
    path: 'tab',
    component: TabPage,
    children: [
      {
        path: 'financeiro',
        children: [
          { path: '', loadChildren: '../financeiro/financeiro.module#FinanceiroPageModule' },
          { path: 'conta-corrente', loadChildren: '../conta-corrente/conta-corrente.module#ContaCorrentePageModule' },
        ]
      }, {
        path: 'vendas',
        children: [
          { path: '', loadChildren: '../vendas/vendas.module#VendasPageModule' },
        ]
      }, {
        path: 'servicos',
        children: [
          { path: '', loadChildren: '../servicos/servicos.module#ServicosPageModule' },
        ]
      }, {
        path: 'opcoes',
        loadChildren: '../opcoes/opcoes.module#OpcoesPageModule'
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/financeiro',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabPageRoutingModule { }
