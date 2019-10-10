import { Routes } from '@angular/router';

export const ProdutoRoutes: Routes = [
  /**
   * Import usado caso queira passar alguma condição.
   * {
   *  path: 'produtos/listar',
   *  loadChildren: () => import('./components/listar-produto/listar-produto.module').then(mod => mod.ListarProdutoModule)
   * }
   */

  {
    path: 'produtos/listar',
    loadChildren: './components/listar-produto/listar-produto.module#ListarProdutoModule'
  },
  {
    path: 'produtos/cadastrar',
    loadChildren: './components/cadastrar-produto/cadastrar-produto.module#CadastrarProdutoModule'
  },
  {
    path: 'produtos/login',
    loadChildren: './components/login/login.module#LoginModule'
  },
  {
    path: 'produtos/editar/:id',
    loadChildren: './components/editar-produto/editar-produto.module#EditarProdutoModule'
  },
  {
    path: 'produtos',
    redirectTo: 'produtos/listar'
  }
];
