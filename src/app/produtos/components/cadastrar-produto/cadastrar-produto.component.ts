import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';

import { ProdutoService } from './../../shared/services/produto/produto.service';
import { UnidadeMedida } from './../../shared/enum/unidade-medida.enum';

@Component({
  selector: 'app-cadastrar-produto',
  templateUrl: './cadastrar-produto.component.html',
  styleUrls: ['./cadastrar-produto.component.css']
})
export class CadastrarProdutoComponent implements OnInit {

  public cadastroForm: FormGroup;
  public valorQuantidade = { prefix: '', suffix: '', thousands: '', decimal: '', precision: '' };
  public dateFormat = 'dd/MM/yyyy';
  public mensagemDataInvalida = 'Campo obrigatório!';
  public unidadeMedida = Object.keys(UnidadeMedida).map(key => {
    return { label: UnidadeMedida[key], value: key};
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private produtoService: ProdutoService
  ) { }

  ngOnInit() {
    this.cadastroForm = this.fb.group({
      nomeItem: [null, [Validators.required]],
      unidadeMedida: [null, [Validators.required]],
      quantidade: [null],
      preco: [null, [Validators.required]],
      produtoPerecivel: [null, [Validators.required]],
      dataValidade: [null],
      dataFabricacao: [null, [Validators.required]]
    });
    this.trocaDeValorUnidadeMedida();
  }

  private trocaDeValorUnidadeMedida() {
    this.cadastroForm.get('unidadeMedida').valueChanges.subscribe(unidade => {
      if (unidade === this.unidadeMedida[0].value) {
        this.valorQuantidade = {prefix: '', suffix: ' Lt', thousands: '', decimal: '', precision: ''};
      } else if (unidade === this.unidadeMedida[1].value) {
        this.valorQuantidade = {prefix: '', suffix: ' Kg', thousands: '', decimal: '', precision: ''};
      } else {
        this.valorQuantidade = {prefix: '', suffix: ' Un',  thousands: '', decimal: '', precision: ''};
      }
    });
  }

  private validacaoData() {
    const dataFabricacao = moment(this.cadastroForm.controls['dataFabricacao'].value).format('DD/MM/YYYY');
    const dataValidade = moment(this.cadastroForm.controls['dataValidade'].value).format('DD/MM/YYYY');
    const produtoPerecivel = this.cadastroForm.get('produtoPerecivel').value;

    if (produtoPerecivel) {
      if (dataFabricacao > dataValidade) {
        this.cadastroForm.get('dataFabricacao').reset();
        this.mensagemDataInvalida = 'Data de fabricação maior que de validade!';
      }
    }
  }

  private validacaoForm() {
    // tslint:disable-next-line:forin
    for (const i in this.cadastroForm.controls) {
      this.cadastroForm.controls[i].markAsDirty();
      this.cadastroForm.controls[i].updateValueAndValidity();
    }
  }

  private validacaoProdutoPerecivel() {
    this.cadastroForm.get('produtoPerecivel').valueChanges.subscribe(perecivel => {
      if (perecivel === true) {
        this.cadastroForm.get('dataValidade').setValidators(Validators.required);
      } else {
        this.cadastroForm.get('dataValidade').clearValidators();
      }
    });
  }

  cadastrar() {
    this.validacaoData();
    this.validacaoProdutoPerecivel();
    this.validacaoForm();


    if (this.cadastroForm.valid) {
      this.produtoService.cadastrarProduto(this.cadastroForm.value);
      this.router.navigate(['/produtos/listar']);

    }
  }

  cancelar() {
    this.cadastroForm.reset();
    this.router.navigate(['/produtos/listar']);
  }

}
