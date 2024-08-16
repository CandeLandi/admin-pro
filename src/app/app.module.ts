import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NoPageFoundComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    PagesModule,
    SharedModule,
    AuthModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
