import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from "../services/user.service";
import { User } from "../user.model";
import { Subscription } from 'rxjs';

@Component({
  selector: "app-home-page",
  templateUrl: "home-page.component.html",
  styleUrls: ["home-page.component.css"]
})
export class HomePageComponent {
  loggedIn : boolean = false;
  username : string;
  authenticated : User[] = []
  authenticatedSub : Subscription;
  constructor(private userService: UserService) {
    this.authenticated = this.userService.getAuthenticated();
    this.authenticatedSub = this.userService.getAuthenticatedUpdateListener()
      .subscribe(authenticated => {
        this.authenticated = authenticated;
      })
  }

  goToPrivatePage() {
    this.userService.requestPrivatePage();
  }

  ngOnInit() {}
  ngOnDestroy() {
    this.authenticatedSub.unsubscribe();
  }
}
