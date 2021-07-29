import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { angularMath } from 'angular-ts-math';
import { FlightinfoService } from 'src/app/_Services/flightinfo.service';
@Component({
  selector: 'app-passenger-details',
  templateUrl: './passenger-details.component.html',
  styleUrls: ['./passenger-details.component.scss']
})
export class PassengerDetailsComponent implements OnInit {
  Schlid: any = "";
  fullname = ""
  age = ""
  gender = "Female"
  mealType = ""
  passengerList: any = []
  hasPassenger = false
  visible = true
  Scheduledetails: any = {}
  errorMessage = ""
  NumOfPassenger = 0
  basePrice = 0
  total_price = 0
  total_price_copy = 0
  disocunts: any = {}
  DoneBooking = false
  card = ""
  cvv = ""
  exp_month = ""
  exp_yr = ""
  pnr = ""
  constructor(private route: ActivatedRoute, private flightinfoService: FlightinfoService, private router: Router) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('schlid');
    this.Schlid = id;
    //console.log("booking-id="+this.Schlid);
    this.flightinfoService.ShowSchedulebyId(this.Schlid)
      .subscribe((res: any) => {
        this.Scheduledetails = res;
        this.basePrice = res.price;
      },
        (err: any) => {
          console.log(err)
          this.errorMessage = err.message;
        })
    this.flightinfoService.getDiscounts()
      .subscribe((res: any) => {
        this.disocunts = res;
      },
        (err: any) => {
          console.log(err)
          this.errorMessage = err.message;
        })

  }
  SavePassenger() {
    //console.log("Saved")
    let passenger = {
      "fullname": this.fullname,
      "age": this.age,
      "gender": this.gender,
      "mealType": this.mealType
    }
    this.fullname = ""
    this.age = ""
    this.gender = "Female"
    this.mealType = ""
    this.passengerList.push(passenger);
    this.NumOfPassenger = this.NumOfPassenger + 1;
    this.total_price = this.basePrice * this.NumOfPassenger;
    this.total_price_copy = this.total_price;
    this.hasPassenger = true;
    this.visible = false;
  }
  toggleShow() {
    if (this.visible == true) {
      this.visible = false;
    }
    else {
      this.visible = true;
    }
  }
  CheckOut() {
    this.hasPassenger = false;
    this.visible = false;
  }
  selectOption(event: any) {
    this.total_price_copy = this.total_price
    for (let d of this.disocunts) {
      if (d.id == event.target.value) {
        var price = this.total_price_copy * (parseFloat(d.discountPer) / 100)
        if (price >= parseFloat(d.Maxdiscount)) {
          this.total_price_copy = this.total_price_copy - d.Maxdiscount;
        }
        else {
          this.total_price_copy = this.total_price_copy - price;
        }
        break
      }
    }
  }
  FinalPayment() {
    this.pnr = angularMath.getRandom().toString(20).substr(2, 8);
    let pass = {
      "userid": localStorage.getItem('User'),
      "schlId": this.Schlid,
      "pricepaid": this.total_price_copy,
      "passengerinfo": this.passengerList,
      "status": "Active",
      "pnr": this.pnr
    }
    this.flightinfoService.registrationBooking(pass)
      .subscribe((res: any) => {
        //console.log(res)
        console.log("Successful")
        //this.router.navigate(['Manage-booking'])
        this.DoneBooking = true
      },
        (err: any) => {
          console.log(err)
          this.errorMessage = err.message;
        })
  }
}
