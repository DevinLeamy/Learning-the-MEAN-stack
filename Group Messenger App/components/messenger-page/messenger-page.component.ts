import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { Router } from "@angular/router";

@Component({
  selector: "app-messenger-page",
  templateUrl: "messenger-page.component.html",
  styleUrls: ["messenger-page.component.css"],
  providers: [MessageService]
})
export class MessengerPageComponent {
  constructor(private messageService : MessageService, private router : Router) {}

  ngOnInit() {
    console.log(this.router.url);
    if (this.router.url === '/chat/A') {
      this.messageService.setGroup("A");
    } else {
      this.messageService.setGroup("B");
    }
    this.messageService.getAllMessages();
    this.messageService.initializeSocket();
  }
}
