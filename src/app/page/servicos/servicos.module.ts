import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ServicosPage } from './servicos.page';
import { CalendarioSemanalHorizontalComponent } from 'src/app/componentes/calendario-semanal-horizontal/calendario-semanal-horizontal.component';

const routes: Routes = [
  {
    path: '',
    component: ServicosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ServicosPage,
    CalendarioSemanalHorizontalComponent
  ],
  exports:[
    CalendarioSemanalHorizontalComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ServicosPageModule { }
