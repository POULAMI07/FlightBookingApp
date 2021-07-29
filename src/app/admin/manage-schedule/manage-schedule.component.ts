import { Component, OnInit } from '@angular/core';
import { FlightinfoService } from 'src/app/_Services/flightinfo.service';

@Component({
  selector: 'app-manage-schedule',
  templateUrl: './manage-schedule.component.html',
  styleUrls: ['./manage-schedule.component.scss']
})
export class ManageScheduleComponent implements OnInit {
  Isresult = false;
  visibile = false;
  airlineName = "";
  flightNum = "";
  date = "";
  time = "";
  source = "";
  destination = "";
  price = 2500;
  items: any = {};
  total_schedule = 0
  result: any = {}
  errorMessage = ""
  isedit = false;
  schId = "";
  constructor(private flightinfoService: FlightinfoService) { }

  ngOnInit(): void {
    this.loadAllschedules()
  }
  loadAllschedules() {
    this.flightinfoService.getSchedules()
      .subscribe((res: any) => {
        this.total_schedule = res.length;
        if (this.total_schedule != 0) {
          this.Isresult = true
        }
        this.result = res;
      },
        (err: any) => {
          console.log(err)
          this.errorMessage = err.message;
        })

    this.flightinfoService.getAirlines()
      .subscribe((res: any) => {
        this.items = res;
      },
        (err: any) => {
          console.log(err)
          this.errorMessage = err.message;
        })
  }
  SaveSchedule() {
    let scheduleObj =
    {
      "airlineName": this.airlineName,
      "flightNum": this.flightNum,
      "date": this.date,
      "time": this.time,
      "source": this.source,
      "destination": this.destination,
      "price": this.price
    }
    this.airlineName = "";
    this.flightNum = "";
    this.date = "";
    this.time = "";
    this.source = "";
    this.destination = "";
    this.price = 2500;
    this.flightinfoService.registrationSchedule(scheduleObj)
      .subscribe((res: any) => {
        console.log(res)
        console.log("Successful")
        alert("Successfully added")
      },
        (err: any) => {
          console.log(err)
          this.errorMessage = err.message;
        })

  }
  toggleShow() {
    this.schId = "";
    this.airlineName = "";
    this.flightNum = "";
    this.date = "";
    this.time = "";
    this.source = "";
    this.destination = "";
    this.price = 2500;
    if (this.visibile == true) {
      this.visibile = false;
    }
    else {
      this.visibile = true;
    }
  }
  selectOption(event: any) {
    this.airlineName = event.target.value;
  }
  deleteSchedule(id: string) {
    if (confirm("Are you sure to delete the schedule?")) {
      this.flightinfoService.deleteSchedule(id)
        .subscribe(
          () => {
            console.log("Schedule with Id =" + id + "deleted");
            this.loadAllschedules();
            alert("Schedule deleted")
          },
          (err) => console.log(err)
        );
    }
  }
  editbutton(id: string) {
    this.flightinfoService.ShowSchedulebyId(id)
      .subscribe((res: any) => {
        this.schId = res.id;
        this.airlineName = res.airlineName;
        this.flightNum = res.flightNum;
        this.date = res.date;
        this.time = res.time;
        this.source = res.source;
        this.destination = res.destination;
        this.price = res.price;
        this.isedit = true;
      },
        (err: any) => {
          console.log(err)
          this.errorMessage = err.message;
        })
  }
  updateSchedule() {
    let schdl =
    {
      "id": this.schId,
      "airlineName": this.airlineName,
      "flightNum": this.flightNum,
      "date": this.date,
      "time": this.time,
      "source": this.source,
      "destination": this.destination,
      "price": this.price
    }
    this.flightinfoService.EditSchedule(this.schId, schdl)
      .subscribe(() => {
        this.loadAllschedules()
        alert("Schedule updated")
        this.isedit = false;
      },
        (err: any) => {
          console.log(err)
          this.errorMessage = err.message;
        })
  }
  CancelButton() {
    this.loadAllschedules()

    this.isedit = false;
  }

}
