import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tab/home',
    pathMatch: 'full'
  },
  {
    path: 'tab',
    loadChildren: () => import('./pages/tab/tab.module').then(m => m.TabPageModule)
  },
  {
    path: 'tab/home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'test',
    loadChildren: () => import('./pages/test/test.module').then(m => m.TestPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'tab1',
    loadChildren: () => import('./pages/tab1/tab1.module').then(m => m.Tab1PageModule)
  },
  {
    path: 'profile1',
    loadChildren: () => import('./pages/profile1/profile1.module').then(m => m.Profile1PageModule)
  },
  {
    path: 'produit',
    loadChildren: () => import('./pages/produit/produit.module').then(m => m.ProduitPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'product-details/:id',
    loadChildren: () => import('./pages/product-details/product-details.module').then(m => m.ProductDetailsPageModule)
  },
  {
    path: 'basket',
    loadChildren: () => import('./pages/basket/basket.module').then(m => m.BasketPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then( m => m.AdminPageModule)
  },





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
