import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutosModule } from './../../produtos.module';
import { ProdutoService } from './../../shared/services/produto/produto.service';
import { ListarProdutoRoutingModule } from './listar-produto-routing.module';
import { ListarProdutoComponent } from './listar-produto.component';

@NgModule({
  imports: [
    CommonModule,
    ListarProdutoRoutingModule,
    ProdutosModule
  ],
  declarations: [
    ListarProdutoComponent
  ],
  providers: [
    ProdutoService
  ]
})
export class ListarProdutoModule { }
