import { Component } from '@angular/core';
import {AngularFireMessaging} from '@angular/fire/compat/messaging'
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fcm-2';
  public token:any
  constructor(
    private fireMessaging: AngularFireMessaging,
    private angularFireMessaging: AngularFireMessaging,
    private http: HttpClient
    
  ){
    // this.angularFireMessaging.messages.subscribe((_message: any) => {
    //   _message.onMessage = _message.onMessage.bind(_message);
    //   _message.onTokenRefresh = _message.onTokenRefresh.bind(_message);
    // });
  }
  ngOnInit(){
    this.requestToken()

    this.receiveMessage()
  }
  requestToken(): void {
    this.fireMessaging.requestToken.subscribe({
      next: token => {
        console.log(token)
         this.token = token
      },
      error: err => {
        console.error('Fetching FCM token failed: ', +err)
      }
    })  
  }
  

  // requestPermission() {

  //   this.angularFireMessaging.requestToken.subscribe((token: any) => {
  //     console.log(token);
  //     localStorage.setItem('token', token);
  //   }).unsubscribe;
  // }

  receiveMessage() {
    this.angularFireMessaging.messages.subscribe((payload: any) => {
      console.log('Message Received - ', payload);
    
    });
  }
  sendTokenToServer(){
    this.http.post("https://vistaging.vajraglobal.com/api/notification",{token:this.token}).toPromise( ).then(data=>{
      console.log(data)
    })
  }
  
  sendNotification(){
    this.http.get("https://vistaging.vajraglobal.com/api/notification").subscribe(data => {
      console.log(data)
    })
  }
}
