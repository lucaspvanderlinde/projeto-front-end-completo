import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { NZ_I18N, pt_BR } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import pt from '@angular/common/locales/pt';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ProdutosModule } from './produtos/produtos.module';
import { LoginModule } from './produtos/components/login/login.module';

registerLocaleData(pt);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProdutosModule,
    BrowserAnimationsModule,
    RouterModule,
    LoginModule
  ],
  providers: [{ provide: NZ_I18N, useValue: pt_BR }],
  bootstrap: [AppComponent]
})
export class AppModule { }
