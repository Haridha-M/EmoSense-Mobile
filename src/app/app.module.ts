import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from './shared/shared.module';
import { ServiceService } from './service.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent,LoginComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,SharedModule,HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },ServiceService],
  bootstrap: [AppComponent],
})
export class AppModule {}
