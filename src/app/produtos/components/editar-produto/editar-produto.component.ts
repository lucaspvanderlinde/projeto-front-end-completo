import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UnidadeMedida } from './../../shared/enum/unidade-medida.enum';
import { Produto } from '../../shared/models/produto.model';
import { ProdutoService } from './../../shared/services/produto/produto.service';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.css']
})
export class EditarProdutoComponent implements OnInit {

  public cadastroForm: FormGroup;
  public produto: Produto;
  public dateFormat = 'dd/MM/yyyy';
  public valorQuantidade = { prefix: '', suffix: '', thousands: '', decimal: '', precision: '' };

  public unidadeMedida = Object.keys(UnidadeMedida).map(key => {
    return { label: UnidadeMedida[key], value: key};
  });

  constructor(
    private produtoService: ProdutoService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.cadastroForm = this.fb.group({
      id: [null],
      nomeItem: [null, [Validators.required]],
      unidadeMedida: [null, [Validators.required]],
      quantidade: [null],
      preco: [null, [Validators.required]],
      produtoPerecivel: [null, [Validators.required]],
      dataValidade: [null],
      dataFabricacao: [null, [Validators.required]]
    });
    this.trocaDeValorUnidadeMedida();
    this.capturarId();
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

  private validacaoProdutoPerecivel() {
    this.cadastroForm.get('produtoPerecivel').valueChanges.subscribe(perecivel => {
      if (perecivel === true) {
        this.cadastroForm.get('dataValidade').setValidators(Validators.required);
      } else {
        this.cadastroForm.get('dataValidade').clearValidators();
      }
    });
  }

  private validacaoForm() {
    // tslint:disable-next-line:forin
    for (const i in this.cadastroForm.controls) {
      this.cadastroForm.controls[i].markAsDirty();
      this.cadastroForm.controls[i].updateValueAndValidity();
    }
  }

  capturarId() {
    const id = +this.route.snapshot.params.id;
    this.produto = this.produtoService.buscarPorId(id);
    this.cadastroForm.patchValue(this.produto);
  }

  editar() {
    this.validacaoProdutoPerecivel();
    this.validacaoForm();

    if (this.cadastroForm.valid) {
      this.cadastroForm.get(JSON.stringify(this.produto.id));
      this.produtoService.atualizarProduto(this.cadastroForm.value);
      this.router.navigate(['/produtos/listar']);
    }
  }

  cancelar() {
    this.cadastroForm.reset();
    this.router.navigate(['/produtos/listar']);
  }
}
