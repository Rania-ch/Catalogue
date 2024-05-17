import { AppUser } from './../model/user.model';
import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userFormGroup! :FormGroup;
  errorMessage :any;
  constructor(private fb : FormBuilder , private authservice : AuthenticationService,
    private router:Router) { }

  ngOnInit(): void {
    this.userFormGroup=this.fb.group({
      username: this.fb.control(""),
      password: this.fb.control(""),
    });
  }
  handleLogin() {
    let username =this.userFormGroup.value.username;
    let password =this.userFormGroup.value.password;
    this.authservice.login(username,password).subscribe(
      {
        next :(appUser) =>{
            this.authservice.authenticateUser(appUser).subscribe(
              { next : () =>
                this.router.navigateByUrl("/admin-template")
              });
        },
        error : (err)=>{ 
          this.errorMessage=err;

        }

      }
    )
    };

}
