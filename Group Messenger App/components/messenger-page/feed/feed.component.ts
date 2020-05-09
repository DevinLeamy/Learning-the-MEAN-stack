import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: "app-feed",
  templateUrl: "feed.component.html",
  styleUrls: ["feed.component.css"]
})
export class FeedComponent {
  messages : string[];
  messagesSub : Subscription;
  constructor(private messageService : MessageService) {}

  ngOnInit() {
    this.messages = this.messageService.getMessages();
    this.messagesSub = this.messageService.getUpdatedMessages()
      .subscribe(messages => {
        this.messages = messages;
        console.log("Messages Updated");
      })
  }
}
