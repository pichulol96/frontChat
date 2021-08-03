import { Component,AfterViewChecked,ElementRef,ViewChild,OnDestroy, OnInit,Input ,Output,EventEmitter} from '@angular/core';
import {UsuarioService } from '../.././services/usuario.service';//servicio
import {ChatService } from '../.././services/chat.service';//servicio
import Echo from 'laravel-echo';
import *as  moment from 'moment'; 



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit,OnDestroy, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  @Input() idUsuario :any=[];
  @Output()
  atras: EventEmitter<boolean>=new EventEmitter<boolean>();
  chats:any;//mensajes que vienen de la base de datos
  userLogeado:any=[];
  objetoUsers:object={};
  btnEnviar=true;
  mensaje:string;
  evenSockte:any;
  objetoMensaje:any;//el obejto con los datos para el servidor;
  elemento:any;
  User2:any;
   constructor(private UsuarioService:UsuarioService, private ChatService:ChatService) {
      

    }

  ngOnInit(): void {
     this.chatUsuarios();
     this.webSockets();
     this.scrollToBottom();
     this.elemento=document.getElementById("chat");
     const hoy = moment();
     console.log(hoy.format('dddd Do MMMM YYYY'));
     
    
     
     

  }
  ngOnDestroy(): void{
    this.UsuarioService.menuOcultarMostrar(true);
  }


    ngAfterViewChecked() {        
        this.scrollToBottom();        
    }

    scrollToBottom(): void {
        try {

            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch(err) { }                 
    } 

  chatSalir(){
    this.atras.emit();
    this.UsuarioService.menuOcultarMostrar(true);
  }

  chatUsuarios()
  {
    this.getUsersChat();  
    this.ChatService.getChat(this.objetoUsers).subscribe(data=>{
        //console.log(data);
        this.chats=data;
       // this.elemento.scrollTop=this.elemento.scrollHeight;
    });
  }
  getUsersChat()//obtiene los dos usurios que estan chatiando
  {
    this.userLogeado=JSON.parse(localStorage.getItem("user"));
    for(let user of this.userLogeado)
    {
       
       this.objetoUsers={usuario1:user.idusuario,usuario2:this.idUsuario.idusuario};
    }  
  }
  activarbtn()
  {
    if(this.mensaje=="")
    {
      this.btnEnviar=true;
    }
    else
    {
      this.btnEnviar=false;
    }
  }

  enviarMensaje()
  {
  
    if(this.chats!="")
    {
         let c=0;
        for(let chat of this.chats)
      {
         
        //let usuario=user.idusuario;
        //let id_mensaje=chat.id_mensaje
        if(c==0)
        {  
           for(let user of this.userLogeado)
          {
             
            
           /*console.log(user.idusuario);
            console.log(chat.id_mensaje);
            console.log(this.mensaje);*/
            let usuaiosMensaje={usuario1:user.idusuario,usuario2:this.idUsuario.idusuario,
                                 mensaje:this.mensaje,idchat:chat.id_mensaje};
             this.ChatService.insertChat(usuaiosMensaje).subscribe(data=>{
            //console.log(data);
            
           });                     
          }
          
           c++;
        }
       
        
      }
      this.mensaje="";
      this.activarbtn();  
    }
    else
    {
           for(let user of this.userLogeado)
          {
            //console.log(user.idusuario);//usuario que envia mensaje
            //console.log(this.mensaje);
            //console.log(this.idUsuario.idusuario);
            let usuaiosMensaje={usuario1:user.idusuario,usuario2:this.idUsuario.idusuario,
                                 mensaje:this.mensaje};
            this.mensaje="";user
            this.activarbtn();  
            this.ChatService.insertChat(usuaiosMensaje).subscribe(data=>{
            //console.log(data);
            
           });
          }
    }

    

   
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
    echo.channel('mensajes-servidor')
    .listen('mensajes',(resp)=>{

      //console.log(resp.data);
     this.evenSockte= JSON.parse(resp.data);
     //console.log(this.evenSockte);
     //console.log(this.chats);
        
        if(this.chats=="")
        {
          this.chats=this.evenSockte;
          
        }
        
        else
        {
          
          if(this.idUsuario.idusuario)
          {
            const snd= new Audio();
            snd.src="assets/sonidos/notificacion.mp3";
            snd.load();
            snd.play();
          }
          
           
             this.chats.push({usuario:this.evenSockte.usuario1,
                              mensaje:this.evenSockte.mensaje,
                              hora:"19:29",
                              id_mensaje:this.evenSockte.idchat,
                              id:1});
          this.elemento.scrollTop=this.elemento.scrollHeight;
        
        }

        
      
     
    }); 

  }


}//cierra clase
