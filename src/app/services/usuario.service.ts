import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {tap} from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
   public url="http://192.168.1.75/chatLaravel/public/api/";
   obsercablelogin$ = new EventEmitter<object>();
   observableChat$ = new EventEmitter<boolean>();
  constructor(private http: HttpClient) {

  }

   

   saveUsuario(usuario:object)
  {
    //this.datos.push(articulo);
    //this.datos.push(imagen);
    //return this.http.post(this.url+'saveArticulos.php',articulo);
    return this.http.post(this.url+'registrarUsuario', (usuario));  
    //console.log([articulo,imagen]);


  }

  usuarioLogin(usuario:object)
  {

    return this.http.post(this.url+'loginUsuario', (usuario))
    .pipe(tap((data)=>{
           
        if(data=="usuario incorrecto")
         {
           
         }
         else if(data=="password incorrecta")
         { 
           
         }
         else 
         {
           
          this.obsercablelogin$.emit(data);
         }
 
    })
    )
    
  }

  usuarioLogaut(usuario:object)
  {
    
    return this.http.post(this.url+'logautUsuario',(usuario));
  }

  getUsers()
  {
    return this.http.get(this.url+'getUsers');
  }

  cabiarFoto(foto:object){
    return this.http.post(this.url+'cambiarFoto', (foto))
    .pipe(tap((data)=>{
      console.log("hola");
      localStorage.removeItem("user");
      localStorage.setItem("user",JSON.stringify(data) );//actualizando localstorage
      this.obsercablelogin$.emit(data);
    })//tap
   )//pipe   
  }//metodo

  menuOcultarMostrar(opcion:boolean)
  {
    if(opcion==true)
    {
     this.observableChat$.emit(true);
    
      
    }
    else if(opcion==false)
    {
      this.observableChat$.emit(false);

      
    }
    
  }
}
