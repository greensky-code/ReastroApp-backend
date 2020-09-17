import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';


@Injectable()
export class WebSocketService {
  merchantId: string;
  chatSocket: WebSocket;
  socketConnection = new Subject<any>();
  changeMessageStatus: boolean;
  chatBaseUrl = 'ws://182.74.213.163:8008/ws/support/sender/403'

  constructor() {
    
  }

  initchatSocket() {
    // if(!localStorage.getItem('merchantId')){
    //   return;
    // }
    this.merchantId = "403"
    this.chatSocket = new WebSocket( this.chatBaseUrl);
    let self = this;
    this.chatSocket.addEventListener('open', function (event) {
      self.socketConnection.next('online');
      // console.log('chat socket online======wsExchange=====', event);
      self.changeMessageStatus = false;
      self.getChatMessage();
    });
    this.chatSocket.addEventListener('close', function (event) {
      self.socketConnection.next('offline');
      // console.log('chat socket ofline======wsExchange=====', event);
      self.initchatSocket();
    });
  }
  getChatMessage() {
    this.chatSocket.addEventListener('message', (event) => {
      let data = JSON.parse(event.data);
      if (data.id) {
        if (data.sender == this.merchantId) {
          this.changeMessageStatus = true;
        } else {
          this.changeMessageStatus = false;
        }
        this.sendMessage(data)
      }

    })
  }
  sendMessage(message) {
    return this.socketConnection.next({ text: message })
  }
  /** to get message */
  receiveMessage(): Observable<any> {
    return this.socketConnection.asObservable();
  }
}