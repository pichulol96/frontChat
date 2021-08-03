import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';//rutas
import { AppComponent } from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
//angular material
import { MaterialModule} from './material-module/material.module';

// http HttpClientModule
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './html/menu/menu.component';
import { MenuLateralComponent } from './html/menu-lateral/menu-lateral.component';
import { ArticulosComponent } from './components/articulos/articulos.component';
import { RegistroArticulosComponent } from './components/registro-articulos/registro-articulos.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { HomeComponent } from './components/home/home.component';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';
import { ChatComponent } from './components/chat/chat.component';
import { EditarUsuarioComponent } from './components/editar-usuario/editar-usuario.component';
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MenuLateralComponent,
    ArticulosComponent,
    RegistroArticulosComponent,
    LoginComponent,
    RegistroUsuarioComponent,
    HomeComponent,
    ListaUsuariosComponent,
    ChatComponent,
    EditarUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,//modulo de los angular material
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
