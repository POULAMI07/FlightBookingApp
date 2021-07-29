import { Component, OnInit } from '@angular/core';
import { FlightinfoService } from 'src/app/_Services/flightinfo.service';

@Component({
  selector: 'app-manage-discounts',
  templateUrl: './manage-discounts.component.html',
  styleUrls: ['./manage-discounts.component.scss']
})
export class ManageDiscountsComponent implements OnInit {
  Isresult = false
  visibile = false
  discount = ""
  discountPer = 0
  Maxdiscount = 0
  total_discount = 0
  result: any = {}
  errorMessage = ""
  isedit = false
  disId = ""
  constructor(private flightinfoService: FlightinfoService) { }

  ngOnInit(): void {
    this.loadAlldiscounts()
  }
  loadAlldiscounts() {
    this.flightinfoService.getDiscounts()
      .subscribe((res: any) => {
        this.total_discount = res.length;
        if (this.total_discount != 0) {
          this.Isresult = true
        }
        this.result = res;
      },
        (err: any) => {
          console.log(err)
          this.errorMessage = err.message;
        })
  }
  SaveDiscount() {
    let discountObj =
    {

      "discount": this.discount,
      "discountPer": this.discountPer,
      "maxdiscount": this.Maxdiscount
    }
    this.discount = "";
    this.discountPer = 0;
    this.Maxdiscount = 0;
    this.flightinfoService.registrationDiscount(discountObj)
      .subscribe((res: any) => {
        console.log(res)
        alert("Successfully added")
        this.loadAlldiscounts()
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
      //this.visibile = true;
      this.discount = "";
      this.discountPer = 0;
      this.Maxdiscount = 0;
      this.visibile = true;
    }
  }
  deleteDiscount(id: any) {
    if (confirm("Are you sure to delete the Discount?")) {
      this.flightinfoService.deleteDiscount(id)
        .subscribe(
          () => {
            console.log("Employee with Id =" + id + "deleted");
            this.loadAlldiscounts()
            alert("Discount deleted")
          },
          (err) => console.log(err)
        );
    }
  }
  editbutton(id: string) {
    this.flightinfoService.ShowDiscountbyId(id)
      .subscribe((res: any) => {
        this.disId = res.id;
        this.discount = res.discount;
        this.discountPer = res.discountPer;
        this.Maxdiscount = res.maxdiscount;
        this.isedit = true;
      },
        (err: any) => {
          console.log(err)
          this.errorMessage = err.message;
        })
  }
  updateDiscount() {
    let disobj =
    {
      "id": this.disId,
      "discount": this.discount,
      "discountPer": this.discountPer,
      "maxdiscount": this.Maxdiscount
    }
    this.flightinfoService.EditDiscount(this.disId, disobj)
      .subscribe(() => {
        this.loadAlldiscounts()
        alert("Discount updated")
        this.isedit = false;
      },
        (err: any) => {
          console.log(err)
          this.errorMessage = err.message;
        })
  }
  CancelButton() {
    this.isedit = false;
    this.loadAlldiscounts()
  }

}
