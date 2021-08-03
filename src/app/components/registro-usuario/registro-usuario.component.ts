import { Component, OnInit } from '@angular/core';
import {NgForm,FormGroup,FormBuilder,FormControl,Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {UsuarioService } from '../.././services/usuario.service';//servicio
import { Router } from '@angular/router';//rutas


@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {
 /* emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
    Validators.minLength(5),
    Validators.maxLength(20),
    
  ]);*/
  registrarUsuario : FormGroup;
  value = '';// input nombre
  hide = true; //input password
  user:string='';
  password:string='';
  email:string='';
  saveUser:any;
  estado:boolean=false;
  progreso:boolean=false;
  constructor(private router:Router, private _builder:FormBuilder, private UsuarioService:UsuarioService) {
     this.saveUser={};
     this.registrarUsuario = this._builder.group({
            name:['',[Validators.maxLength(40), Validators.required]],
            lastName:['',[Validators.maxLength(40), Validators.required]],
            email:['', [Validators.required,Validators.email]],
            password:['', Validators.required],
            
 
       })
   }
  

  ngOnInit(): void {
  }

  newUser(value:object){
    /*this.saveUser={name:this.value,user:this.email,password:this.password}*/
   
    Swal.fire({
      title: '',
      text: "Estas seguro de que tus datos son los correctos?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `si`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.estado=true;
        this.progreso=true;
        let resul=this.UsuarioService.saveUsuario(value).subscribe(data=>{
       //this.articulos=data;
        if(data==1)
        {
          this.estado=false;
          this.progreso=false;
          Swal.fire('Listo!', 'Te enviamos un correro para poder activar tu cuenta', 'success')
          this.router.navigate(['login']);
        }
        else
        { 
          this.progreso=false;
          this.estado=false;
          Swal.fire('Error!', 'Este usuario ya esta registrado', 'warning')
        }
       console.log(data);
     });
        //Swal.fire('Saved!', '', 'success')
      } 
    })
   // console.log(value);
  }

}
