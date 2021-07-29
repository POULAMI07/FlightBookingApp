import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightinfoService } from 'src/app/_Services/flightinfo.service';

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.scss']
})
export class BookFlightComponent implements OnInit {

  wayType = "One-way";
  src = ""
  des = ""
  dat = ""
  return = ""
  result: any = {}
  errorMessage = ""
  isNotFound = false
  isSearched = false
  constructor(private flightinfoService: FlightinfoService, private router: Router) { }

  ngOnInit(): void {
  }
  SearchFlight() {
    this.flightinfoService.SearchFlightByParams(this.src, this.des, this.dat)
      .subscribe((res: any) => {
        console.log(res)
        if (res.length == 0) {
          this.isNotFound = true;
        }
        else {
          this.isNotFound = false;
          this.result = res;
          this.isSearched = true;
        }

      },
        (err: any) => {
          console.log(err)
          this.errorMessage = err.message;
        })
  }
  BookingTicket(SchId: string) {
    this.router.navigate(['/user/Passenger-Details', SchId])
  }


}
