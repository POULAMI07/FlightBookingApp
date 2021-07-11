import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FlightinfoService {
  url:string = "http://localhost:3000";
  constructor(private httpClient:HttpClient) 
  {
    
  }
  getAirlines(){
    console.log("getting all airlines")
    return this.httpClient.get(this.url+"/airline")
  }
}
