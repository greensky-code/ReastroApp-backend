import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable()
export class ChatService {
  // socket: WebSocket;
  socket = new WebSocket('ws://182.74.213.163:8008/ws/support/sender/403');

  constructor() {
   
 
  }

  onopen = function () {
    console.log("Connected to chat socket");
  };

  onmessage = function(event) {
    console.log("WebSocket message received:", event);
  };
  onclose = function(event) {
    console.log("WebSocket is closed now.");//sdfdsfsdfsfsdfsdfsdfds
  };
  
}
