import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CinfigUsersService {
  public url="http://192.168.1.75/chatLaravel/public/api/";
  constructor(private http:HttpClient) { }
/*
  cabiarFoto(foto:object){
  	return this.http.post(this.url+'cambiarFoto', (foto))
  	.pipe(tap((data)=>{
      console.log("hola");
      this.obsercablelogin$.emit(data);
  	})//tap
   )//pipe   
  }//metodo
  */

}
