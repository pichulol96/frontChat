import { Component, OnInit } from '@angular/core';
import {CinfigUsersService} from '../.././services/cinfig-users.service';//servicio
import {UsuarioService } from '../.././services/usuario.service';//servicio

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {
  user:any;
  hide = true;
  imgRutaSinFoto:string="http://192.168.1.75/chatLaravel/public/img/sinfoto.png";
  imgRuta:string="http://192.168.1.75/chatLaravel/public/img/";
  archivos:any;
  imagenVisualizar:string  | ArrayBuffer|number |null ='';
  constructor( private cofigUser:CinfigUsersService,private UsuarioService:UsuarioService) {
   
   }

  ngOnInit(): void {
   this.user=JSON.parse(localStorage.getItem("user"));
  }

  capturarFile(event:any)
  {
    let archivosCapturados=event.target.files[0];
    this.archivos=archivosCapturados;
    console.log(event);
    //this.imagenVisualizar=event.target.files[0];
    const reader= new FileReader()
    reader.onload=e =>this.imagenVisualizar=reader.result;
    reader.readAsDataURL(archivosCapturados);

  }

  subirFoto(){
    if(this.archivos==null)
    {
      alert("Seleccione alguna foto");
      return;
    }
    else
    {
      const img=new FormData();
      img.append("files",this.archivos);
      for(let users of this.user)
      {
         img.append("user",users.idusuario);
      }
      
      //console.log(img);
      this.UsuarioService.cabiarFoto(img).subscribe(data=>{
         //console.log(data);
         if(data==null)
         {
           alert("hubo algun error");
         }
         else
         {
           alert("Imagen actualizada")
         }
      });

    }
    
  }

}
