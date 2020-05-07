import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { FeedComponent } from './components/messenger-page/feed/feed.component';
import { MessageCreateComponent } from './components/messenger-page/message-create/message-create.component';
import { MessengerPageComponent } from './components/messenger-page/messenger-page.component';
import { MessageService } from './services/message.service';

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    MessageCreateComponent,
    MessengerPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatListModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
