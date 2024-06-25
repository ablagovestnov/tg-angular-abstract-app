// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BelongingsComponent } from './belongings/belongings.component';

const routes: Routes = [
  // { path: '', redirectTo: '/belongings', pathMatch: 'full' },
  // { path: 'belongings', component: BelongingsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
