import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

import { AppComponent } from './app.component';
import { LoginPage } from './pages/login/login.page';
import { LoginFormComponent } from './components/login-form/login-form.component';

import { GameViewPage } from './pages/game-view/game-view.page';
import { GameListViewPage } from './pages/game-list-view/game-list-view.page';
import { GameListComponent } from './components/game-list/game-list.component';

export function initializeKeycloak(keycloak: KeycloakService) {
  return () => {
    keycloak.init({
      config: {
        realm: 'hvz',
        url: 'http://localhost:8083/auth/',
        clientId: 'angular-cli',
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html',
      },
      enableBearerInterceptor: true,
    });
  };
}

@NgModule({
  declarations: [
    //Components
    AppComponent,
    LoginPage,
    LoginFormComponent,
    GameViewPage,
    GameListViewPage,
    GameListComponent,
  ],
  imports: [
    //Modules
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    KeycloakAngularModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
