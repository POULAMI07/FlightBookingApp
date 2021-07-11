import { Component, OnInit } from '@angular/core';
import { FlightinfoService } from 'src/app/_Services/flightinfo.service';
@Component({
  selector: 'app-manage-airlines',
  templateUrl: './manage-airlines.component.html',
  styleUrls: ['./manage-airlines.component.scss']
})
export class ManageAirlinesComponent implements OnInit {
  errorMessage:string=""
  result:any={}
  constructor(private flightinfoService:FlightinfoService) { }

  ngOnInit(): void {
    this.flightinfoService.getAirlines()
        .subscribe((res:any)=>{
            this.result=res;
        },
         (err:any)=>{
            console.log(err)
            this.errorMessage = err.message;
        })
  }

}
