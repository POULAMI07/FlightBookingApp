import { Component, Input, OnInit } from '@angular/core';
import { FlightinfoService } from 'src/app/_Services/flightinfo.service';
@Component({
  selector: 'app-manage-airlines',
  templateUrl: './manage-airlines.component.html',
  styleUrls: ['./manage-airlines.component.scss']
})
export class ManageAirlinesComponent implements OnInit {
  errorMessage: string = ""
  result: any = {}
  Isresult = false
  airlinename = "";
  logo = "";
  visibile = false;
  conctnum = 1000000000;
  conctadd = "";
  total_airlines = 0
  isedit = false
  airId = ""
  constructor(private flightinfoService: FlightinfoService) { }
  ngOnInit(): void {
    this.loadAllAirlines()
  }
  loadAllAirlines() {
    this.flightinfoService.getAirlines()
      .subscribe((res: any) => {
        this.total_airlines = res.length;
        if (this.total_airlines != 0) {
          this.Isresult = true
        }
        this.result = res;
      },
        (err: any) => {
          console.log(err)
          this.errorMessage = err.message;
        })
  }
  deleteAirline(airId: string) {
    if (confirm("Are you sure to delete the Airline?")) {
      this.flightinfoService.deleteAirline(airId)
        .subscribe(
          () => {
            console.log("Employee with Id =" + airId + "deleted");
            alert("Airline deleted.")
            this.loadAllAirlines()
          },
          (err) => console.log(err)
        );

    }

  }

  SaveAirline() {
    let airline =
    {
      "airlinename": this.airlinename,
      "logo": this.logo,
      "contactNum": this.conctnum,
      "contactAddress": this.conctadd
    }
    this.airlinename = "";
    this.logo = "";
    this.conctnum = 1000000000;
    this.conctadd = "";
    this.flightinfoService.registrationAirline(airline)
      .subscribe((res: any) => {
        console.log(res)
        //console.log("Successful")
        alert("Successfully added")
        this.loadAllAirlines()

      },
        (err: any) => {
          console.log(err)
          this.errorMessage = err.message;
        })

  }
  toggleShow() {
    if (this.visibile == true) {
      this.visibile = false;
    }
    else {
      this.visibile = true;
      this.airlinename = "";
      this.logo = "";
      this.conctnum = 1000000000;
      this.conctadd = "";
    }
  }

  editbutton(id: string) {
    this.flightinfoService.ShowAirlinebyId(id)
      .subscribe((res: any) => {
        this.airId = res.id;
        this.airlinename = res.airlinename;
        this.logo = res.logo;
        this.conctnum = res.contactNum;
        this.conctadd = res.contactAddress;
        this.isedit = true;

      },
        (err: any) => {
          console.log(err)
          this.errorMessage = err.message;
        })
  }
  updateAirline() {
    let airobj =
    {
      "airlinename": this.airlinename,
      "logo": this.logo,
      "contactNum": this.conctnum,
      "contactAddress": this.conctadd
    }
    this.flightinfoService.EditAirline(this.airId, airobj)
      .subscribe(() => {
        this.isedit = false;
        alert("Airline modified.")
        this.loadAllAirlines()
      },
        (err: any) => {
          console.log(err)
          this.errorMessage = err.message;
        })
  }
  CancelButton() {
    this.loadAllAirlines()
    this.isedit = false;
  }

}
