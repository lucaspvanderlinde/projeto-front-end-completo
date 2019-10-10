import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxCurrencyModule } from 'ngx-currency';

import { ProdutosModule } from './../../produtos.module';
import { CadastrarProdutoComponent } from './cadastrar-produto.component';
import { CadastrarProdutoRoutingModule } from './cadastrar-produto-routing.module';
import { ProdutoService } from '../../shared/services/produto/produto.service';

@NgModule({
  imports: [
    CommonModule,
    CadastrarProdutoRoutingModule,
    ProdutosModule,
    NgxCurrencyModule
  ],
  declarations: [
    CadastrarProdutoComponent
  ],
  providers: [
    ProdutoService
  ]
})
export class CadastrarProdutoModule { }
