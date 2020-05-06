import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from "../services/user.service";
import { Credentials } from '../credentials.model';
import { NgForm } from '@angular/forms';
import { User } from '../user.model';
import { Location } from '@angular/common';

@Component({
  selector: "app-login-page",
  templateUrl: "login-page.component.html",
  styleUrls: ["login-page.component.css"]
})
export class LoginPageComponent {
  waiting = false
  authenticatingSub : Subscription;
  authenticating : Credentials[] = [];
  authenticatedSub : Subscription;
  authenticated : User[] = [];
  userCredentials : Credentials;
  constructor(private userService : UserService, private location : Location) {}

  ngOnInit() {
    //Initializes arrays and subs
    this.authenticating = this.userService.getAuthenticating();
    this.authenticatingSub = this.userService.getAuthenticationUpdateListener()
      .subscribe(authenticating => {
        this.authenticating = authenticating;
        this.updatedAuthenticationStatus();
      });
    this.authenticated = this.userService.getAuthenticated();
    this.authenticatedSub = this.userService.getAuthenticatedUpdateListener()
      .subscribe(authenticated => {
        this.authenticated = authenticated;
      });
  }

  authenticate(form: NgForm) {
    if (!form.invalid) {
      this.waiting = true;
      this.userCredentials = {
        username: form.value.username,
        password: form.value.password
      }
      //Freeze input fields
      this.userService.authenticateUser(form.value.username, form.value.password);
      form.resetForm();
    }
  }

  updatedAuthenticationStatus() {
    if (this.waiting) {
      var found = false;
      for (var i = 0; i < this.authenticating.length; i++) {
        if (this.authenticating[i].username === this.userCredentials.username && this.authenticating[i].password === this.userCredentials.password) {
          found = true;
        }
      }
      if (!found) {
        found = false;
        this.waiting = false;
        for (var i = 0; i < this.authenticated.length; i++) {
          if (this.authenticated[i].username === this.userCredentials.username) {
            found = true;
          }
          if (found) {
            //Send user to home page
            this.location.go("home");
            window.location.reload();
          }
        }
      }
    }
  }
  ngOnDestroy() {
    this.authenticatingSub.unsubscribe();
    this.authenticatedSub.unsubscribe();
  }
}
