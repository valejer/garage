import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription, Observable, Subject } from 'rxjs';
import { GarageService } from '../services/garage.service';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-garage-list',
  templateUrl: './garage-list.component.html',
  styleUrls: ['./garage-list.component.css']
})
export class GarageListComponent implements OnInit, OnDestroy {

  // private garagesAndPayments$: Observable<{ garages: Garage[], payments: RequiredPayment[] }>;
  private garagesAndPayments: { garages: Garage[], payments: RequiredPayment[] };
  private garagesAndPaymentsSub: Subscription;
  private selectedGarage: Garage;
  private payments: RequiredPayment[];

  private tableSort = {
    fns: {
      garageNumber: {
        asc: (g1: Garage, g2: Garage) => {
          return g1.number > g2.number ? 1 : g1.number === g2.number ? 0 : -1;
        },
        desc: (g1: Garage, g2: Garage) => {
          return g1.number > g2.number ? -1 : g1.number === g2.number ? 0 : 1;
        }
      },
      ownerName: {
        asc: (g1: Garage, g2: Garage) => {
          return g1.owner.name > g2.owner.name ? 1 : g1.owner.name === g2.owner.name ? 0 : -1;
        },
        desc: (g1: Garage, g2: Garage) => {
          return g1.owner.name > g2.owner.name ? -1 : g1.owner.name === g2.owner.name ? 0 : 1;
        }
      },
      length: {
        asc: (g1: Garage, g2: Garage) => {
          return g1.length > g2.length ? 1 : g1.length === g2.length ? 0 : -1;
        },
        desc: (g1: Garage, g2: Garage) => {
          return g1.length > g2.length ? -1 : g1.length === g2.length ? 0 : 1;
        }
      },
      width: {
        asc: (g1: Garage, g2: Garage) => {
          return g1.width > g2.width ? 1 : g1.width === g2.width ? 0 : -1;
        },
        desc: (g1: Garage, g2: Garage) => {
          return g1.width > g2.width ? -1 : g1.width === g2.width ? 0 : 1;
        }
      },
      height: {
        asc: (g1: Garage, g2: Garage) => {
          return g1.height > g2.height ? 1 : g1.height === g2.height ? 0 : -1;
        },
        desc: (g1: Garage, g2: Garage) => {
          return g1.height > g2.height ? -1 : g1.height === g2.height ? 0 : 1;
        }
      }
    },
    ascStates: {
      garageNumber: true,
      ownerName: false,
      length: false,
      width: false,
      height: false,
    }
  }

  constructor(
    private garageService: GarageService
  ) { }

  trackGaragesByFn(index, garage: Garage) {
    return garage._id;
  }

  refreshGarages() {
    // this.garagesAndPayments$ = this.garageService.getGaragesAndPayments();
  }

  onGarageClick(garageAndPayments: { garage: Garage, payments: RequiredPayment[] }) {
    this.selectedGarage = garageAndPayments.garage;
    this.payments = garageAndPayments.payments;
  }

  resetSortKeys() {
    Object.keys(this.tableSort.ascStates).forEach(key => {
      this.tableSort.ascStates[key] = false;
    })
  }

  sortBy(sortKey: any) {
    if (this.tableSort.ascStates[sortKey]) {
      this.garagesAndPayments.garages.sort(this.tableSort.fns[sortKey].desc);
      this.tableSort.ascStates[sortKey] = false;
    } else {
      this.garagesAndPayments.garages.sort(this.tableSort.fns[sortKey].asc);
      this.resetSortKeys();
      this.tableSort.ascStates[sortKey] = true;
    }
  }

  // sortByNumber() {
  //   if (this.tableSort.ascStates.garageNumber) {
  //     this.garagesAndPayments.garages.sort(this.tableSort.fns.garageNumber.desc);
  //     this.tableSort.ascStates.garageNumber = false;
  //   } else {
  //     this.garagesAndPayments.garages.sort(this.tableSort.fns.garageNumber.asc);
  //     this.resetSortKeys();
  //     this.tableSort.ascStates.garageNumber = true;
  //   }
  // }

  // sortByOwnerName() {
  //   if (this.tableSort.ascStates.ownerName) {
  //     this.garagesAndPayments.garages.sort(this.tableSort.fns.ownerName.desc);
  //     this.tableSort.ascStates.ownerName = false;
  //   } else {
  //     this.garagesAndPayments.garages.sort(this.tableSort.fns.ownerName.asc);
  //     this.resetSortKeys();
  //     this.tableSort.ascStates.ownerName = true;
  //   }
  // }

  ngOnInit() {
    // this.garagesAndPayments$ = this.garageService.getGaragesAndPayments();
    this.garagesAndPaymentsSub = this.garageService.getGaragesAndPayments()
      .subscribe(data => this.garagesAndPayments = data);
  }

  ngOnDestroy() {
    this.garagesAndPaymentsSub.unsubscribe();
  }

}
