// src/frontend/frontend-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestDataComponent } from "./components/test-data/test-data.component";

const routes: Routes = [
  { path: '', redirectTo: '/test-data', pathMatch: 'full' },
  { path: 'test-data', component: TestDataComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
