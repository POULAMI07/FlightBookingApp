//import { serializeNodes } from '@angular/compiler/src/i18n/digest';
import { Component, OnInit } from '@angular/core';
//import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { LoginSerService } from 'src/app/_Services/login-ser.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  //loginUserForm:FormGroup;
  email="";
  password="";
  result:any = {};
  errorMessage:string = "";
  //loginUserForm:FormGroup;
    constructor(private loginSerService:LoginSerService,private router:Router){
        
        /*this.loginUserForm = new FormGroup({
            email: new FormControl("", [
                Validators.required,
                Validators.pattern("[A-Za-z0-9._]+@[a-z0-9.]+\\.[a-z]{2,3}")
            ]),
            password: new FormControl("", [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(10)
            ])
        })*/
    }

    getLogin(){
        var length,role;
        this.loginSerService.Authorization(this.email,this.password)
        .subscribe((res:any)=>{
            length = res.length;
            role = res[0].roleId;
            this.Auth(length,role,res[0].id);
        },
         (err:any)=>{
            console.log(err)
            this.errorMessage = err.message;
        })
        
    }
    
    Auth(length:number,role:number,id:string)
    {
        if(length==1 && role===1)
        {
            localStorage.setItem('Role','Admin')
            console.log("Admin page..")
            this.router.navigate(["admin"]);
        }
        else if(length===1 && role===2)
        {
            localStorage.setItem('User',id)
            console.log("User page..")
            this.router.navigate(["user"]);
        }
        else
        {
            console.log("Unauthorized")
            this.router.navigate(["log-in"]);
        }
    }
}
