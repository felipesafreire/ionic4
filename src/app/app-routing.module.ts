import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './page/home/home.module#HomePageModule' },
  { path: 'cidade', loadChildren: './page/cidade/cidade.module#CidadePageModule' },
  { path: 'tab', loadChildren: './page/tab/tab.module#TabPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
