
import {NgForm,FormControl, Validators,ReactiveFormsModule} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AppRoutingModule } from '../../app-routing.module';
import {UsuarioService } from '../.././services/usuario.service';//servicio
import { Router } from '@angular/router';//rutas

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  register:string="/registro/usuario";//ruta para ir a registrar un usuario
  hide = true;
  user:string='';
  password:string='';
  alerta=false;
  mensaje:string='';
  userLogeado:object={};
  progreso=false;
  estado:boolean=false;


  constructor(private UsuarioService:UsuarioService, private router:Router) {  }

  ngOnInit(): void {
  	
  }

  login()
  {
    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    //Se muestra un texto a modo de ejemplo, luego va a ser un icono
    
    if (this.user=="" || this.password=="" ) {
        this.mensajeAlerta("Porfavor llene todos los campos");
        
    }

    else if (!emailRegex.test(this.user)) {
      this.mensajeAlerta("el correo esta mal escrito");
    } 

    else
     {
       this.estado=true;
       this.progreso=true;
       this.userLogeado={user:this.user,password:this.password}
       this.UsuarioService.usuarioLogin(this.userLogeado).subscribe(data=>{
         if(data=="usuario incorrecto")
         {
           this.progreso=false;
           this.mensajeAlerta("El usuario es incorrecto o no existe");
           this.estado=false;
         }
         else if(data=="password incorrecta")
         { 
           this.progreso=false;
           this.mensajeAlerta("La contraseña es incorrecta");
           this.estado=false;
         }
         else 
         {
           this.progreso=false;
           this.progreso=false;
           localStorage.setItem("user",JSON.stringify(data) );
           this.router.navigate(['home']);
         }
          //console.log(data);
       });
       

     }

  }
  
  limpiarAlerta()
  {
    this.alerta=false;
    this.mensaje='';
  }

  mensajeAlerta(mensaje:string)
  {
    this.mensaje=mensaje;
    this.alerta=true;
  }

}
