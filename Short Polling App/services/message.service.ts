import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs'
import { Message } from '../models/message.model';

@Injectable({
  providedIn: "root"
})
export class MessageService {
  messages : string[] = [];
  messagesUpdated = new BehaviorSubject<string[]>([]);

  apiUrl = "http://localhost:3000/api/";
  constructor(private http: HttpClient) {
    console.log("MESSAGE SERVICE INITIALIZED");
    this.shortPolling();
  }

  getMessages() {
    return [...this.messages];
  }
  getUpdatedMessages() {
    return this.messagesUpdated.asObservable()
  }

  postMessage(message) {
    var body = {
      message: message
    };
    var headers = new HttpHeaders();
    headers = headers.set("content-type", "application/json");
    this.http.post(this.apiUrl + "post", body, {headers : headers})
      .subscribe((res : Message) => {
        this.messages.push(res.message);
        this.updateMessages();
      })
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

  shortPolling() {
    var _this = this;
    setInterval(function() {
      _this.http.get(_this.apiUrl + "messages")
      .subscribe((messages : Message[]) => {
        _this.messages = [];
        for (var i = 0; i < messages.length; i++) {
          _this.messages.push(messages[i].message);
        }
        _this.updateMessages();
      })
    }, 3000);
  }

  updateMessages() {
    this.messagesUpdated.next([...this.messages]);
  }

}
