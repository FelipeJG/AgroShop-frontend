import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './_material/material.module';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFabMenuModule } from '@angular-material-extensions/fab-menu';
import { EcoFabSpeedDialModule } from '@ecodev/fab-speed-dial';
import { PanelAdminModule } from './pages/admin/panel-admin/panel-admin.module';
import { RegistryComponent } from './pages/authorization/registry/registry.component';
import { RegistryFormComponent } from './pages/authorization/registry/registry-form/registry-form.component';

export function tokenGetter() {
  let tk = sessionStorage.getItem(environment.TOKEN_NAME);
  let token = tk != null ? tk : '';
  return token;
}

@NgModule({
  declarations: [
    AppComponent,
    RegistryComponent,
    RegistryFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    EcoFabSpeedDialModule,
    MaterialModule,
    FlexLayoutModule,
    PanelAdminModule,
   /*JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:8080'],
        blacklistedRoutes: ['http://localhost:8080/oauth/token']
      }
    }),
    */
    MatFabMenuModule,


  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent],
  exports:[
    FlexLayoutModule,


  ],
})
export class AppModule { }
