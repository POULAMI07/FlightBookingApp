import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FlightinfoService {
  // url:string = "http://localhost:3000";
  // url1:string = "http://localhost:8989/admin/API";
  // url2:string = "http://localhost:8989/user";
  url1: string = "http://ec2-18-189-20-2.us-east-2.compute.amazonaws.com:8989/admin/API";
  url2: string = "http://ec2-18-189-20-2.us-east-2.compute.amazonaws.com:8989/user";
  //url3:string = "http://localhost:8989/admin/API";
  //url4:string = "http://localhost:8989/user";
  //header:string="bearer "+JSON.stringify(localStorage.getItem('token'))
  constructor(private httpClient: HttpClient) {

  }
  
  getAirlines() {
    console.log("getting all airlines")
    return this.httpClient.get(this.url1 + "/airlineController")
  } 
  getSchedules() {
    console.log("getting all schedule")
    return this.httpClient.get(this.url1 + "/scheduleController")
  }
  
  getDiscounts() {
    console.log("getting all Discount")
    // const headers=new HttpHeaders({ Authorization: JSON.stringify(localStorage.getItem('token'))});
    return this.httpClient.get(this.url1 + "/discountController")
  }
  deleteAirline(id: any) {
    console.log(this.url1 + "/airlineController/" + id)
    //return this.httpClient.delete(this.url+"/airline?id="+id);
    return this.httpClient.delete(this.url1 + "/airlineController/" + id);
  }
  deleteDiscount(id: any) {
    return this.httpClient.delete(this.url1 + "/discountController/" + id);
  }
  deleteSchedule(id: any) {
    return this.httpClient.delete(this.url1 + "/scheduleController/" + id);
  }
  registrationAirline(airline: any) {
    return this.httpClient.post(this.url1 + "/airlineController", airline);
  }
  registrationDiscount(discount: any) {
    return this.httpClient.post(this.url1 + "/discountController", discount);
  }
  registrationSchedule(schedule: any) {
    return this.httpClient.post(this.url1 + "/scheduleController", schedule);
  }
  ShowSchedulebyId(id: any) {
    return this.httpClient.get(this.url1 + "/scheduleController/" + id);
  }
  ShowDiscountbyId(id: any) {
    return this.httpClient.get(this.url1 + "/discountController/" + id);
  }
  ShowAirlinebyId(id: any) {
    return this.httpClient.get(this.url1 + "/airlineController/" + id);
  }
  EditSchedule(schid: string, schedule: any) {
    console.log("Sucessful editing schedule...")
    return this.httpClient.put(this.url1 + "/scheduleController/" + schid, schedule);
  }
  EditDiscount(disid: string, discount: any) {
    console.log("Sucessful editing discount...")
    return this.httpClient.put(this.url1 + "/discountController/" + disid, discount);
  }
  EditAirline(airid: any, airline: any) {
    console.log("Sucessful editing airline...")
    return this.httpClient.put(this.url1 + "/airlineController/" + airid, airline);
  }
  
  SearchFlightByParams(s: string, d: string, dat: string) {
    return this.httpClient.get(this.url1 + "/scheduleController/search?src=" + s + "&des=" + d + "&date=" + dat);
  }
  
  registrationBooking(bookObj: any) {
    return this.httpClient.post(this.url2 + "/bookingController", bookObj);
  }
  ShowBookingbyUserId(id: any) {
    return this.httpClient.get(this.url2 + "/bookingController/user?userid=" + id);
  }
  CancelBooking(bookid: any, bookingObj: any) {
    return this.httpClient.put(this.url2 + "/bookingController/cancelbooking/" + bookid, bookingObj);
  }
  /*remember to change this to url1
  getReport() {
    console.log("getting all kafka topic values")
    return this.httpClient.get(this.url3 + "/report")
  }*/
}
