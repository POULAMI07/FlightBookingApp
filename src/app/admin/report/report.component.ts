import { Component, OnInit } from '@angular/core';
import { FlightinfoService } from 'src/app/_Services/flightinfo.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  result:any={}
  errorMessage=""
  isEmpty=true
  constructor(private flightinfoService: FlightinfoService) { }

  ngOnInit(): void {
    //this.loadallreport();
  }
  /*loadallreport()
  {
    this.flightinfoService.getReport()
    .subscribe((res: any) => {
      if(res==null)
      {
        this.isEmpty=true;
      }
      else
      {
        this.isEmpty=false;
        this.result = res;
      }
     
    },
      (err: any) => {
        console.log(err)
        this.errorMessage = err.message;
      })
  }*/

}
