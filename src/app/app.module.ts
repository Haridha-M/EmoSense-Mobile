import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from './shared/shared.module';
import { ServiceService } from './service.service';
import { HttpClientModule } from '@angular/common/http';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  declarations: [AppComponent,LoginComponent,SignUpComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,SharedModule,HttpClientModule,  RouterModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },ServiceService],
  bootstrap: [AppComponent],
})
export class AppModule {}
