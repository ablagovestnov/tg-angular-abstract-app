// src/frontend/frontend.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule, registerLocaleData } from "@angular/common";
import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { ru_RU } from 'ng-zorro-antd/i18n';
import ru from '@angular/common/locales/ru';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzListModule } from "ng-zorro-antd/list";
import { TestDataComponent } from "./components/test-data/test-data.component";

registerLocaleData(ru);

@NgModule({
  declarations: [
    AppComponent,
    TestDataComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    AppRoutingModule,
    NzLayoutModule,
    NzButtonModule,
    NzListModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    { provide: NZ_I18N, useValue: ru_RU },
    provideAnimationsAsync(),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
