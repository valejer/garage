import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-garage-details',
  templateUrl: './garage-details.component.html',
  styleUrls: ['./garage-details.component.css']
})
export class GarageDetailsComponent implements OnInit {

  @Input() garage: Garage;
  @Input() payments: RequiredPayment[];

  constructor() { }

  getRequiredPayment(year: number): number {
    return this.payments.find(payment => payment.year === year).amount;
  }

  ngOnInit() {
  }

}
