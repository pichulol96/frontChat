import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public url="http://192.168.1.75/chatLaravel/public/api/";
  constructor(private http:HttpClient) { }

    getChat(usuarios:object)
  {

    return this.http.post(this.url+'getChat', (usuarios));  
    


  }

    insertChat(mensaje:object)
  {

    return this.http.post(this.url+'insertChat', (mensaje));  
    


  }

}
