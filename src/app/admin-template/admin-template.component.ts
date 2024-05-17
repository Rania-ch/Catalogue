import { Router } from '@angular/router';
import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.scss']
})
export class AdminTemplateComponent implements OnInit {


  constructor(public  authService : AuthenticationService , private router : Router) { }

  ngOnInit(): void {
  }
  handlLogout() {
  this.authService.logout().subscribe({
    next : (data) =>{
      this.router.navigateByUrl("/login")
    }

  })

}}
