import { NgxCurrencyModule } from 'ngx-currency';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutoService } from './../../shared/services/produto/produto.service';
import { ProdutosModule } from './../../produtos.module';
import { EditarProdutoComponent } from './editar-produto.component';
import { EditarProdutoRoutingModule } from './editar-produto-routing.module';

@NgModule({
  imports: [
    CommonModule,
    EditarProdutoRoutingModule,
    ProdutosModule,
    NgxCurrencyModule
  ],
  declarations: [
    EditarProdutoComponent
  ],
  providers: [
    ProdutoService
  ]
})
export class EditarProdutoModule { }
