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
    email = "";
    password = "";
    result: any = {};
    errorMessage: string = "";
    public showLoginFailed = false;
    //loginUserForm:FormGroup;
    constructor(private loginSerService: LoginSerService, private router: Router) {

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

    getLogin() {
        var length, role;
        var auth = { "str1": this.email, "str2": this.password }
        var details = { "username": this.email, "password": this.password }
        this.loginSerService.authenticate(details)
            .subscribe((res: any) => {
                console.log(res.token)
                console.log("Inside jwt")
                //localStorage.setItem('Role','Admin')
                //this.router.navigate(["admin"]);
                /* if(res)
                 {
                     localStorage.setItem("token",'Bearer '+res.token)
                 }
                 else
                 {
                     this.showLoginFailed=true;
                 }*/
            },
                (err: any) => {
                    console.log(err)
                    this.errorMessage = err.message;
                    this.showLoginFailed = true;
                })
        this.loginSerService.Authorization(auth)
            .subscribe((res: any) => {
                console.log(res)
                //console.log("Inside jwt")
                if (res) {
                    role = res.roleId;
                    this.Auth(role, res.id);
                }
                else {
                    this.showLoginFailed = true;
                }
            },
                (err: any) => {
                    console.log(err)
                    this.errorMessage = err.message;
                })

    }

    Auth(role: number, id: string) {
        if (role === 1) {
            localStorage.setItem('Role', 'Admin')
            localStorage.setItem('username', 'Admin')
            console.log("Admin page..")
            this.router.navigate(["admin"]);
        }
        else if (role === 2) {
            localStorage.setItem('User', id)
            localStorage.setItem('username', 'user')
            console.log("User page..")
            this.router.navigate(["user"]);
        }
        else {
            console.log("Unauthorized")
            this.router.navigate(["log-in"]);
        }
    }
}
