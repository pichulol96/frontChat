import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';//rutas

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user:object;
  constructor(private router:Router) {
   }

  ngOnInit(): void {
    //localStorage.removeItem("user");
  	
  	this.user=JSON.parse(localStorage.getItem("user"))
  	//console.log(this.user)
  	if(this.user==null)
  	{
       //alert("Debes de iniciar session para poder entrar aqui");
       this.router.navigate(['login']);
  	}
  }

}
