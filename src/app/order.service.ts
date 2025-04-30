import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private ordersSubject = new BehaviorSubject<any[]>([]);
  orders$ = this.ordersSubject.asObservable();

  setOrders(orders: any[]) {
    this.ordersSubject.next(orders);
  }

  getOrders(): any[] {
    return this.ordersSubject.getValue();
  }
}
