import { Component, OnInit } from '@angular/core';
import { FlightinfoService } from 'src/app/_Services/flightinfo.service';
import { DatePipe } from '@angular/common';
declare let jsPDF: any;
@Component({
  selector: 'app-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.scss']
})
export class ManageBookingComponent implements OnInit {

  constructor(private datePipe: DatePipe, private flightinfoService: FlightinfoService) { }
  userid: any = localStorage.getItem('User');
  result: any = {}
  errorMessage = ""
  BookingList: any = []
  uniqueSch: any = []
  schdulDetails: any = []
  isEmpty = true
  ShowingDetails: any = []
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
    if (schdate >= today) {
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
  CancelBooking(bookingId: any) {
    //console.log(bookingId)
    if (confirm("Are you sure to cancel your Booking?")) {
      let pass = {
        "userid": this.ShowingDetails[bookingId].bookingdetails.userid,
        "schlId": this.ShowingDetails[bookingId].bookingdetails.schlId,
        "pricepaid": this.ShowingDetails[bookingId].bookingdetails.pricepaid,
        "passengerinfo": this.ShowingDetails[bookingId].bookingdetails.passengerinfo,
        "status": "Inactive",
        "pnr": this.ShowingDetails[bookingId].bookingdetails.pnr
      }
      this.flightinfoService.CancelBooking(this.ShowingDetails[bookingId].bookingdetails.id, pass)
        .subscribe(() => {
          //console.log(res)
          console.log("Successful")
          //this.router.navigate(['Manage-booking'])
          //this.DoneBooking=true
        },
          (err: any) => {
            console.log(err)
            this.errorMessage = err.message;
          })
    }
  }
  downloadTicket(bookingId: any) {
    var doc = new jsPDF('l', 'pt', 'A4');
    var rows1 = [];
    var rows2 = [];
    var item = this.ShowingDetails[bookingId].bookingdetails;
    var item2 = this.ShowingDetails[bookingId].scheduleDetails;
    doc.text("\n\nTicket " + item2.source + " ---------> " + item2.destination + "\n\n", 30, 8)
    doc.text("\nPNR: " + item.pnr + "\n\n", 680, 30)
    var col1 = ["Airline", "flightNum", "Journey Date", "Boarding Time"]
    rows1 = [[item2.airlineName, item2.flightNum, item2.date, item2.time]]

    var col2 = ["Name", "Age", "Gender", "Meal Type"]
    for (var i = 0; i < item.passengerinfo.length; i++) {
      rows2.push([item.passengerinfo[i].fullname, item.passengerinfo[i].age, item.passengerinfo[i].gender, item.passengerinfo[i].mealType])
    }
    doc.text("\nBooking Details:", 30, 70)
    doc.autoTable(col1, rows1, { startY: 100 })
    doc.text("\nPassenger Details:", 30, 175)
    doc.autoTable(col2, rows2, { startY: 210 })
    var filename = "Ticket_" + item2.flightNum + ".pdf";
    doc.rect(20, 20, doc.internal.pageSize.width - 40, doc.internal.pageSize.height - 40, 'S');
    doc.save(filename);
  }
}
