import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import * as moment from 'moment';

import { UnidadeMedida } from './../../shared/enum/unidade-medida.enum';
import { MensagemService } from './../../shared/services/mensagem/mensagem.service';
import { Produto } from './../../shared/models/produto.model';
import { ProdutoService } from './../../shared/services/produto/produto.service';

@Component({
  selector: 'app-listar-produto',
  templateUrl: './listar-produto.component.html',
  styleUrls: ['./listar-produto.component.css']
})
export class ListarProdutoComponent implements OnInit {

  public produtos: Produto[];
  public unidadeMedida = Object.keys(UnidadeMedida).map(key => {
    return { label: UnidadeMedida[key], value: key};
  });

  constructor(
    private produtoService: ProdutoService,
    private modalService: NzModalService,
    private mensagemService: MensagemService
  ) { }

  ngOnInit() {
    this.produtos = this.listarTodosProdutos();
    // console.log(this.validacaoQuantidade());
  }

  listarTodosProdutos(): Produto[] {
    return this.produtoService.listarTodosProdutos();
  }

  validacaoProdutoVencido(data: Produto) {
    return moment(data.dataValidade).format('DD/MM/YYYY') < moment(new Date()).format('DD/MM/YYYY');
  }

  // validacaoQuantidade() {
  //   this.produtos.forEach(produto => {
  //     if (produto.unidadeMedida === this.unidadeMedida[0].value) {
  //       console.log(produto.quantidade + ' Lt');
  //     }
  //   });
  // }

  modalRemover(produto: Produto) {
    this.modalService.confirm({
      nzTitle: 'Deseja remover o produto?',
      nzOkText: 'Sim',
      nzOkType: 'danger',
      nzOnOk: () => this.remover(produto),
      nzCancelText: 'Não',
      nzOnCancel: () => ''
    });
  }

  remover(produto: Produto) {
    this.produtoService.removerProduto(produto.id);
    this.produtos = this.produtoService.listarTodosProdutos();
    this.mensagemService.successMessage('Produto removido!');
  }
}
