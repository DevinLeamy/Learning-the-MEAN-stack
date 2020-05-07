import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs'
import { Message } from '../models/message.model';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: "root"
})
export class MessageService {
  private socket : SocketIOClient.Socket;
  messages : string[] = [];
  messagesUpdated = new BehaviorSubject<string[]>([]);

  apiUrl = "http://localhost:3000/api/";
  constructor(private http: HttpClient) {
    this.socket = io.connect("http://localhost:3000");
    console.log("MESSAGE SERVICE INITIALIZED");
    this.getAllMessages();
    this.initializeSocket();
  }

  getMessages() {
    return [...this.messages];
  }
  getUpdatedMessages() {
    return this.messagesUpdated.asObservable()
  }

  postMessage(message : string) {
    console.log("New message sent to server");
    this.socket.emit("send-message", { message: message });
  }

  getAllMessages() {
    this.http.get(this.apiUrl + "messages")
      .subscribe((messages : Message[]) => {
        this.messages = [];
        for (var i = 0; i < messages.length; i++) {
          this.messages.push(messages[i].message);
        }
        this.updateMessages();
      })
  }

  initializeSocket() {
    var this_ = this;
    this.socket.on("receive-message", function(data) {
      console.log("New message received from server")
      var message = data.message;
      this_.messages.push(message);
      this_.updateMessages();
    })
  }

  updateMessages() {
    this.messagesUpdated.next([...this.messages]);
  }

}
