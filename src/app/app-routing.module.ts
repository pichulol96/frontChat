import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenuComponent} from './html/menu/menu.component';
import { ArticulosComponent} from './components/articulos/articulos.component';
import { HomeComponent} from './components/home/home.component';
import { LoginComponent} from './components/login/login.component';
import { RegistroUsuarioComponent} from './components/registro-usuario/registro-usuario.component';
import { EditarUsuarioComponent} from './components/editar-usuario/editar-usuario.component';
import { ListaUsuariosComponent} from './components/lista-usuarios/lista-usuarios.component';


const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'articulos',component:ArticulosComponent},
  {path:'registro/usuario',component:RegistroUsuarioComponent},
  {path:'home',component:HomeComponent},
  {path:'lista/usuarios',component:ListaUsuariosComponent},
  {path:'configuracion',component:EditarUsuarioComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
