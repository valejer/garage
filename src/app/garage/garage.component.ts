import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-garage',
  templateUrl: './garage.component.html',
  styleUrls: ['./garage.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GarageComponent implements OnInit {

  @Input() index: number;
  @Input() garage: Garage;
  @Input() payments: RequiredPayment[];

  @Output() garageClickEvent = new EventEmitter<{ garage: Garage, payments: RequiredPayment[] }>();

  constructor() { }

  garageClick() {
    this.garageClickEvent.emit({ garage: this.garage, payments: this.payments });
  }

  setClass() {
    const paymentsList = this.garage.payments;
    const lastPayment = paymentsList[paymentsList.length - 1];
    const lastRequiredPayment = this.payments[this.payments.length - 1];
    return {
      "garage--payment-part": lastPayment.amount > 0 && lastPayment.amount < lastRequiredPayment.amount,
      "garage--payment-no": lastPayment.amount <= 20,
      "garage--payment-full": lastPayment.amount >= lastRequiredPayment.amount
    }
  }

  ngOnInit() { }

}
