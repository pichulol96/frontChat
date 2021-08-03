import {MediaMatcher} from '@angular/cdk/layout';
import { Component,ChangeDetectorRef,OnDestroy, OnInit } from '@angular/core';
import { AppRoutingModule } from '../../app-routing.module';
import { Router } from '@angular/router';//rutas
import {UsuarioService } from '../.././services/usuario.service';//servicio
import Echo from 'laravel-echo';
import {Subscription} from 'rxjs';

//import pusher from 'pusher-js';
@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit,OnDestroy {
  mobileQuery: MediaQueryList;
  hidden = false;
  user:object;
  menuOcultar=true;//se oculatan o se muetran solo unas partes del menu
  menuNavegacion=true;//se oculta y se muestra todo el menu 
  observableSusvriptio:Subscription;
  observableChat:Subscription

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  //fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);
   parteUsuarios=[
    
      {
        name:"Login",route:"login",icon:"people",categoria:"user",title:"User"
      },
      {
        name:"Register Users ",route:"registro/usuario",icon:"group_add",categoria:"user",title:""
      },
    
      

  ]
  fillerNav=[
      {
        name:"Home",route:"home",icon:"home",categoria:"home",title:"Home"
      },
  	 
      {
  	    name:"Items",route:"articulos",icon:"article",categoria:"items",title:"Items"
      },
      {
        name:"Chat",route:"lista/usuarios",icon:"question_answer",categoria:"Chat",title:"Chat"
      },
      {
        name:"Setting",route:"configuracion",icon:"settings",categoria:"Setting",title:"Setting"
      },
    
      

	]


  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
               private router:Router, private UsuarioService:UsuarioService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.observableSusvriptio.unsubscribe();//limpiar observable
  }

  //shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

  ngOnInit(): void {

     this.login();
     this.user=JSON.parse(localStorage.getItem("user"));
      
   
      this.observableChat=this.UsuarioService.observableChat$.subscribe(data=>{
         //console.log(data);
         this.menuNavegacion=data;
       }); 

      this.observableSusvriptio=this.UsuarioService.obsercablelogin$.subscribe(data=>{
      this.user=data;        
       });
     // console.log(this.user);
  }
  


  login()
  {
    this.observableSusvriptio=this.UsuarioService.obsercablelogin$.subscribe(data=>{
      if(this.user==null)
      {
        this.user=data;
        //alert("hola");
        console.log(this.user);

      }
      
         //console.log(data);
         //this.menuOcultar=data;
        
       });
  }

  cerrarSesion()
  {
    let user= JSON.parse(localStorage.getItem("user"));
    //onsole.log(user);
    this.UsuarioService.usuarioLogaut(user).subscribe(data=>{
      //console.log(data);
    if(data==1)
    {
      this.user=null;
     localStorage.removeItem("user");
    this.router.navigate(['login']);
    //this.menuOcultar=true;
    }  
    
    });
  }

}

