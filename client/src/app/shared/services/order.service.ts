import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Order } from "../interfaces";




@Injectable({
  providedIn: 'root'
})
export class OrderServise {

  constructor(
    private http: HttpClient
  ) {}

  create(order: Order): Observable<Order> {
    return this.http.post<Order>('api/order', order)
  }

  getByUser(id: string): Observable<Order[]> {
    return this.http.get<Order[]>('api/order/'+id)
  }

  fetch():Observable<Order[]> {
    return this.http.get<Order[]>('api/order')
  }

}
