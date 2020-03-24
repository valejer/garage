import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject, EMPTY, zip, forkJoin, throwError, of } from 'rxjs';
import { mergeMap, map, delay, filter, flatMap, tap, switchMap, take, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GarageService {

  private garages$: Observable<Garage[]>;
  private payments$: Observable<RequiredPayment[]>;
  private garagesAndPayments$: Observable<{
    garages: Garage[],
    payments: RequiredPayment[]
  }>;

  private removed: number[] = [];

  constructor(
    private http: HttpClient
  ) { }

  handleError<T>(operation: string = 'operation', result?: T) {
    return (err: any) => {
      console.log(`Writing to log... Error when doing ${operation}`);
      console.log(`Error data: ${err}`);
      return of(result);
    }
  }

  getPayments(): Observable<RequiredPayment[]> {
    return <Observable<RequiredPayment[]>>this.http.get('/assets/payments.json').pipe(
      catchError(this.handleError('get payments via http (getGarages())', []))
    );
  }

  getGarages(): Observable<Garage[]> {
    return <Observable<Garage[]>>this.http.get('/assets/garages.json').pipe(
      catchError(this.handleError('get garages via http (getGarages())', []))
    );
  }

  getGaragesAndPayments(): Observable<{ garages: Garage[], payments: RequiredPayment[] }> {
    if (!this.garages$) this.garages$ = this.getGarages();
    if (!this.payments$) this.payments$ = this.getPayments();
    this.garagesAndPayments$ = forkJoin(this.garages$, this.payments$).pipe(
      map(([garages, payments]) => ({ garages, payments })),
      // delay(500)
    );
    return this.garagesAndPayments$;
  }

  getGarage(id: number): Observable<{ garage: Garage, payments: RequiredPayment[] }> {
    return this.garagesAndPayments$.pipe(
      map(data => {
        return {
          garage: data.garages.find(garage => garage._id === id),
          payments: data.payments
        };
      })
    );
  }

  removeGarage(id: number): Observable<{ garages: Garage[], payments: RequiredPayment[] }> {
    if (this.removed.indexOf(id) === -1) {
      this.removed.push(id);
    }
    return this.garagesAndPayments$.pipe(
      map(data => {
        return {
          garages: data.garages.filter(garage => this.removed.indexOf(garage._id) === -1),
          payments: data.payments
        }
      })
    );
  }
}
