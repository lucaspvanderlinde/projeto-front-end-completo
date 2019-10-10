import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login.routing.module';
import { LoginComponent } from './login.component';
import { ProdutosModule } from './../../produtos.module';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    ProdutosModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
  ]
})
export class LoginModule { }
