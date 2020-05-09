import { Component } from "@angular/core";
import { MessageService } from '../../../services/message.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: "app-message-create",
  templateUrl: "message-create.component.html",
  styleUrls: ["message-create.component.css"]
})
export class MessageCreateComponent {
  constructor(private messageService : MessageService) {}

  postNewMessage(messageForm : NgForm) {
    if (!messageForm.invalid) {
      this.messageService.postMessage(messageForm.value.message);
      messageForm.resetForm();
    }
  }
}
