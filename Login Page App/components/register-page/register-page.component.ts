import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../user.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Credentials } from '../credentials.model';

@Component({
  selector: 'app-register-page',
  templateUrl: "register-page.component.html",
  styleUrls: ["register-page.component.css"]
})
export class RegisterPageComponent {
  authenticatingSub : Subscription;
  authenticating : Credentials[] = [];
  authenticatedSub : Subscription;
  authenticated : User[] = [];
  userCredentials : Credentials;
  constructor(private userService: UserService) {}

  ngOnInit() {
    //Initializes arrays and subs
    this.authenticating = this.userService.getAuthenticating();
    this.authenticatingSub = this.userService.getAuthenticationUpdateListener()
      .subscribe(authenticating => {
        this.authenticating = authenticating;
      });
    this.authenticated = this.userService.getAuthenticated();
    this.authenticatedSub = this.userService.getAuthenticatedUpdateListener()
      .subscribe(authenticated => {
        this.authenticated = authenticated;
      });
  }

  createNewAccount(form: NgForm) {
    if (!form.invalid) {
      if (form.value.password === form.value.passwordReentered) {
        this.userService.postNewUser(form.value.username, form.value.password);
      }
      form.resetForm();
    }
  }


  ngOnDestroy() {
    this.authenticatingSub.unsubscribe();
    this.authenticatedSub.unsubscribe();
  }
}
