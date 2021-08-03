import { Component, OnInit } from '@angular/core';
import {NgForm,FormGroup,FormBuilder,FormControl,Validators} from '@angular/forms';

@Component({
  selector: 'app-registro-articulos',
  templateUrl: './registro-articulos.component.html',
  styleUrls: ['./registro-articulos.component.css']
})
export class RegistroArticulosComponent implements OnInit {
  inputs=[
	  {nombre:"nombre",valor1:""},
	  {nombre:"apellido",valor2:""},
	  {nombre:"edad",valor3:""},
  ]
  constructor() {
     
   }

  ngOnInit(): void {
  }

}
