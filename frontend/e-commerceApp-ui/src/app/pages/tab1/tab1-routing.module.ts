import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tab1Page } from './tab1.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
    children: [
      {
        path: 'profile1',
        loadChildren: () => import('../profile1/profile1.module').then( m => m.Profile1PageModule)
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab1PageRoutingModule {}
