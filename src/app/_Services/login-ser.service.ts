import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
}
)
export class LoginSerService {
  url:string = "http://localhost:3000";
  constructor(private httpClient:HttpClient) {  }

  Authorization(email:string,pwd:string)
  {
    console.log("Authorization........................")
    return this.httpClient.get(this.url+"/user?email="+email+"&password="+pwd)
  }
  
  getUsers(){
    console.log("getting all users")
    return this.httpClient.get(this.url+"/user")
  }
  getUsersDetails(){
    console.log("getting User details")
    //localStorage.getItem('User');
    console.log(localStorage.getItem('User'))
    return this.httpClient.get(this.url+"/user?id="+localStorage.getItem('User'));
  }

  loggedInAdmin()
  {
    return !!localStorage.getItem('Role');
    
  }
}
