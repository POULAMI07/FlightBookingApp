import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginSerService } from 'src/app/_Services/login-ser.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  result: any = {}
  name: any = ""
  errorMessage: string = ""
  constructor(private loginSerService: LoginSerService, private router: Router) {

  }

  ngOnInit(): void {
    /*this.loginSerService.getUsersDetails()
    .subscribe((res:any)=>{
        this.result=res;
    },
     (err:any)=>{
        console.log(err)
        this.errorMessage = err.message;
    })*/
    this.name = sessionStorage.getItem('username')
  }
  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['']);
  }

}
