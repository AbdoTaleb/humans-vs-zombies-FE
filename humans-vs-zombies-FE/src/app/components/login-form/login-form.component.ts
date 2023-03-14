import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  constructor(
    private readonly keycloak: KeycloakService,
    private readonly userService: UserService
  ) {}

  public isLoggedIn = '';
  public userProfile: KeycloakProfile | null = null;

  public async ngOnInit() {
    this.isLoggedIn = await this.keycloak.getToken();
    console.log(this.isLoggedIn);

    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
      console.log('hmm' + this.userProfile);
    }
  }

  public login() {
    this.keycloak.login();
  }

  public logout() {
    this.keycloak.logout();
  }

  showModal = false;
  toggleModal() {
    this.showModal = !this.showModal;
  }
}
