import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Statistics } from "../interfaces";

@Injectable({
  providedIn:'root'
})
export class StatisticsService {

  constructor(private http: HttpClient) {}

  getById(id:string): Observable<Statistics> {
    return this.http.get<Statistics>(`api/statistics/${id}`)
  }
  editInfo(info:any,id: string): Observable<any> {
    return this.http.patch<any>(`/api/statistics/${id}`, info)
  }
}
