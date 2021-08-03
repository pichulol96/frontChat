import { Component, OnInit } from '@angular/core';
import {UsuarioService } from '../.././services/usuario.service';//servicio
import Echo from 'laravel-echo';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {
  value = 'Escribe aqui';
  chats:object;
  mensaje:string='focus';
  persona:string='noFocus';
  chat=false;
  usersOnline:any;
  totalUsuarios:number=0
  evenSockte:any;
  userChat:object;
  constructor(private UsuarioService:UsuarioService) {
  this.usersOnline=[];
  this.chats=[
      {
        name:"Home",route:"home",icon:"home",categoria:"home",title:"Home"
      },
  	  {
  	  	name:"Users",route:"login",icon:"people",categoria:"user",title:"User"
  	  },
	    {
  	    name:"Register Users ",route:"registro/usuario",icon:"group_add",categoria:"user",title:""
      },
      {
  	    name:"Items",route:"articulos",icon:"article",categoria:"items",title:"Items"
      },
      {
        name:"Chat",route:"lista/usuarios",icon:"question_answer",categoria:"Chat",title:"Chat"
      },
    
      

	]
}

  ngOnInit(): void {
   this.getChats();
   this.getUsersOnline(); 
   this.webSockets();

  }
  focus(value:string)
  {
    if(value=="mensaje")
    {
       this.mensaje="focus";
       this.persona="noFocus";
    }
    else if(value=="personas")
    {
       this.persona="focus";
       this.mensaje="noFocus";

    }
    
  }

  getUsersOnline()
  {
    this.UsuarioService.getUsers().subscribe(data=>{
         this.usersOnline=data;
         this.totalUsuarios=this.usersOnline.length;
        
          //console.log(data);
       });
  }

   getChats()
  {
    let userLogeado=JSON.parse(localStorage.getItem("user"));
    console.log(userLogeado);
  }

  chatear(id:number,nombre_completo:string,img:string)
  {    this.UsuarioService.menuOcultarMostrar(false);
         //console.log(data);
        // this.menuOcultar=data;
         this.userChat={idusuario:id,nombre_completo:nombre_completo,img:img};
         this.chat=!this.chat;
       
       
  }

  salirChat()
  {
    this.chat=!this.chat;
  }

    webSockets()
  {
    const echo = new Echo({  
    broadcaster: 'pusher',
    //cluster:'mt1',
    key:'4c0dc97cf3e8ca80056d',
    wsHost: window.location.hostname,
    wsPort: 6001,
    
    //enabledTransports:['ws'],
    forceTLS: false,
    disableStats: true

    
     });
    echo.channel('mi-canal')
    .listen('usuariosConctados',(resp)=>{

      //console.log(resp.data);
     this.evenSockte= JSON.parse(resp.data);
     console.log(this.evenSockte);
     for(let user of this.evenSockte)
     {   
        if(this.usersOnline=="")
        {
          this.usersOnline=this.evenSockte;
          this.totalUsuarios=this.usersOnline.length;
        }
        
        else
        {
            let c=0;//contador
            for(let conectado of this.usersOnline)
          {
              
              if(conectado.nombre_completo==user.nombre_completo)
              {
                console.log(conectado.nombre_completo,user.nombre_completo);
                this.usersOnline.splice(c,1) ;  
                this.totalUsuarios=this.usersOnline.length;
                return;


              }
              
              c++;  

          }

             this.usersOnline.push({nombre_completo:user.nombre_completo,
                                img:user.img});
             this.totalUsuarios=this.usersOnline.length;
                
                   
              

          
        }
        
      }
     
    }); 

  }

}
