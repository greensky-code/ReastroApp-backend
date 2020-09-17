import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// import { Message } from '../chat/shared/model/message';
import { ApiServiceService } from '../api-service.service';

import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { ChatService } from '../chat.service';
import { WebSocketService } from '../websocket.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {
  selectedTab: any='1a';
  @ViewChild('scrollMe', { static: true }) private myScrollContainer: ElementRef;
  loadList: boolean;
  getChatListData: any = [];
  loadHistory: boolean;
  getHistoryUser: any;
  userChatHistory: any = [];
  textMessage: any;
  lastSendMessage: any;
  lastSendStatus: boolean;
  rearchCustomer: any;
  searchCustomerList: any=[];
  chatMessageForm: FormGroup;
  sendImgUrl: any;

  constructor(private service: ApiServiceService,public webSocket:WebSocketService,private fb:FormBuilder) { 
    this.webSocket.initchatSocket();
    this.webSocket.receiveMessage().subscribe((res: any) => {
      if(res == 'online'){
          if(this.getChatListData.length > 0){
            let req = {
              'action': 'join',
              'room': {
                'id': this.getHistoryUser.id,
                'sender_id': Number(this.webSocket.merchantId),
                'receiver_id': this.getHistoryUser.sender,
                'chat_type': this.getHistoryUser.chat_type,
              }
            }
            this.webSocket.chatSocket.send(JSON.stringify(req));
          }else{
            this.getChatList();
          }
      }else if(res.text){
        this.userChatHistory.push(res.text);
        // this.userChatHistory =  this.userChatHistory.reduceRight((r, a)=>{
        //     r.some(function (b) { return a.id === b.id; }) || r.push(a);
        //     return r;
        //   }, []);  
        this.scrollEnd();
      }
      if (this.webSocket.changeMessageStatus == true) {
        this.lastSendStatus = false;
        this.lastSendMessage = '';
      }
    })
  }

  ngOnInit() {
    if (this.webSocket.changeMessageStatus == true || this.webSocket.changeMessageStatus == false) {
      this.getChatList();
    }
    this.chatMessageForm = this.fb.group({
      textMessage:new FormControl('',Validators.compose([Validators.required])),
      // sendDocument:new FormControl('')
    })
  }
  makeActive(event){
    this.selectedTab = event;
  }

  ngOnDestroy() {
    if (this.getChatListData.length == 0) {
      return;
    } else {
      let req = {
        'action': 'leave',
        'room': {
          'id': this.getHistoryUser.id
        }
      }
      this.webSocket.chatSocket.send(JSON.stringify(req));
    }
  }
  getChatList() {
    this.loadList = true;
    this.service.getApi('chat/chat-list?chat_type=a-d', 1).subscribe((data: any) => {
      this.loadList = false;
      if (data.status == 200) {
        this.getChatListData = data.body.data;
        if (this.getChatListData.length == 0) {
          return;
        } else {
          this.getChatHistory(this.getChatListData[0]);
        }

      }
    });
  }
  updateChatList() {
    this.service.getApi('chat/chat-list?chat_type=a-d', 1).subscribe((data: any) => {
      if (data.status == 200) {
        this.getChatListData = data.body.data;
      }
    });
  }
  searchCustomerFunction(){
    this.getChatListData = []
    this.service.getApi('chat/chat-list?chat_type=m-c&search='+this.rearchCustomer,1).subscribe((data:any)=>{
      if (data.status == 200) {
        this.getChatListData = data.body.data;
      }
    });
  }
  getChatHistory(item) {
    this.lastSendMessage = '';
    this.lastSendStatus = false;
    if (this.getHistoryUser) {
      if(this.getHistoryUser.id == item.id){
        return;
      }
      let req = {
        'action': 'leave',
        'room': {
          'id': this.getHistoryUser.id
        }
      }
      this.webSocket.chatSocket.send(JSON.stringify(req));
    }
    this.loadHistory = true;
    this.getHistoryUser = item;
    this.userChatHistory = [];
    this.service.getApi('chat/chat-history/' + item.id, 1).subscribe((data: any) => {
      this.loadHistory = false;
      if (data.status == 200) {
        this.updateChatList();
        let req = {
          'action': 'join',
          'room': {
            'id': this.getHistoryUser.id,
            'sender_id': Number(this.webSocket.merchantId),
            'receiver_id': this.getHistoryUser.sender,
            'chat_type': this.getHistoryUser.chat_type,
            // 'support': this.getChatListData[0].id,
          }
        }
        this.webSocket.chatSocket.send(JSON.stringify(req));
        let list = data.body.reverse();
        this.userChatHistory = list;
        this.scrollEnd();
      }
    });
  }
  sendMassageToCustomer() {
    if (this.chatMessageForm.value.textMessage || this.sendImgUrl) {
    let req = {
      'action': 'send',
      'room': {
        'id': this.getHistoryUser.id
      },
      "messages": {
        "message": this.chatMessageForm.value.textMessage?this.chatMessageForm.value.textMessage:'',
        'sender_id': Number(this.webSocket.merchantId),
        'receiver_id': this.getHistoryUser.sender,
        "image": this.sendImgUrl?this.sendImgUrl:'',
        "message_type": "text"
      }
    }
    this.webSocket.chatSocket.send(JSON.stringify(req));
    this.lastSendMessage = {
      image: this.sendImgUrl?this.sendImgUrl:'',
      message: this.chatMessageForm.value.textMessage?this.chatMessageForm.value.textMessage:'',
      message_type: "text",
      read: true,
      receiver: this.getHistoryUser.sender,
      sender: Number(this.webSocket.merchantId),
    }
    this.lastSendStatus = true;
    this.chatMessageForm.reset();
    this.scrollEnd();
  }
  }
  scrollEnd() {
    setTimeout(() => {
      try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      } catch (err) { }
    }, 10);
  }
  readMessage() {
    if (!this.getHistoryUser ) {
      return;
    }
    if(this.getHistoryUser.unread_msgs == 0){
      return;
    }
    
    this.service.getApi('chat/read-msg/' + this.getHistoryUser.id, 1).subscribe((data: any) => {
      if (data.status == 200) {
        this.updateChatList();
      }
    });
  }
  // ------------------------- Upload Restaurant image-----------------------//
  // senDocumentFunction(event) {
  //   if (event.target.files && event.target.files[0]) {
  //     // upload image function
  //     var FileSize = event.target.files[0].size / 1024 / 1024; // in MB
  //     var type = event.target.files[0].type;
  //     if(type === 'image/png' || type === 'image/jpg' || type === 'image/jpeg') {
  //       if (FileSize > 2) {
  //         this.service.toastErr("file exceed size 2 MB");
  //       } else {
  //         this.lastSendStatus = true;
  //         var file = <File>event.target.files[0]
  //         const fileData = new FormData();
  //         fileData.append('image', file);
  //         // this.service.showSpinner();
  //         this.service.imageUpload('merchant/image', fileData).subscribe((data: any) => {
  //           // this.service.hideSpinner();
  //           if (data.status == 200) {
  //             this.sendImgUrl = data.body.file_name
  //             this.sendMassageToCustomer()
  //           }
  //         })
  //       }        
  //     }else{
  //       this.service.toastErr('Select only jpg,jpeg and png file.')
  //     }
  //   }
  // }
}
