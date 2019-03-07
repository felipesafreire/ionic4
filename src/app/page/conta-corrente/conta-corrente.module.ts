import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ContaCorrentePage } from './conta-corrente.page';

const routes: Routes = [
  {
    path: '',
    component: ContaCorrentePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ContaCorrentePage]
})
export class ContaCorrentePageModule {}
