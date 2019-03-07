import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { TabPage } from './tab.page';
import { TabPageRoutingModule } from './tab-routing.module';
import { FinanceiroPageModule } from '../financeiro/financeiro.module';
import { VendasPageModule } from '../vendas/vendas.module';
import { ServicosPageModule } from '../servicos/servicos.module';
import { OpcoesPageModule } from '../opcoes/opcoes.module';
import { ContaCorrentePageModule } from '../conta-corrente/conta-corrente.module';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TabPageRoutingModule,
    FinanceiroPageModule,
    VendasPageModule,
    ServicosPageModule,
    ContaCorrentePageModule
  ],
  declarations: [TabPage]
})
export class TabPageModule { }
