import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarProdutoComponent } from './listar-produto.component';


const routes: Routes = [
  {
    path: '',
    component: ListarProdutoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListarProdutoRoutingModule { }
