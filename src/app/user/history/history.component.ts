import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlightinfoService } from 'src/app/_Services/flightinfo.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  userid: any = localStorage.getItem('User');
  result: any = {}
  errorMessage = ""
  BookingList: any = []
  uniqueSch: any = []
  schdulDetails: any = []
  isEmpty = true
  ShowingDetails: any = []
  constructor(private datePipe: DatePipe, private flightinfoService: FlightinfoService) { }

  ngOnInit(): void {
    this.flightinfoService.ShowBookingbyUserId(this.userid)
      .subscribe((res: any) => {
        this.result = res;
        if (res.length > 0) {
          var distinct = new Set();
          for (var i = 0; i < this.result.length; i++) {
            distinct.add(this.result[i].schlId)
          }
          this.GetScheduleDetails(distinct)
        }
        else {
          this.isEmpty = true
        }
        //this.TestBooking()
      },
        (err: any) => {
          console.log(err)
          this.errorMessage = err.message;
        })
  }
  GetScheduleDetails(Schids: any) {

    console.log("GetScheduleDetails")
    for (var id of Schids) {
      //count++
      this.flightinfoService.ShowSchedulebyId(id)
        .subscribe((res: any) => {
          this.BookingDetailsForManange(res)
        },
          (err: any) => {
            console.log(err)
            this.errorMessage = err.message;
          })
    }
  }
  BookingDetailsForManange(res: any) {
    var today: any = new Date()
    today = this.datePipe.transform(today, 'yyyy-MM-dd')
    var schdate: any = this.datePipe.transform(res.date, 'yyyy-MM-dd')
    if (schdate < today) {
      for (var i = 0; i < this.result.length; i++) {
        if (this.result[i].schlId == res.id) {
          this.ShowingDetails.push({
            "bookingdetails": this.result[i],
            "scheduleDetails": res
          })
        }
      }
      this.isEmpty = false
    }
  }

}
