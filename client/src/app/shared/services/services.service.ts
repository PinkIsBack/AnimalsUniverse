import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Message, Service } from "../interfaces";


@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  constructor(private http: HttpClient) { }

  featch(): Observable<Service[]> {
    return this.http.get<Service[]>('/api/services/')
  }

  getById(id: string): Observable<Service> {
    return this.http.get<Service>(`/api/services/${id}`)
  }

  create(service: Service, image: File): Observable<{ message: string }> {
    const fd = new FormData()

    if (image) {
      fd.append('image', image, image.name)
    }

    fd.append('name', service.name)
    fd.append('phone', service.phone)
    fd.append('type', service.type)
    fd.append('web', service.web)
    fd.append('address', service.address)
    return this.http.post<{ message: string }>('/api/services', fd)
  }

  update(service: Service, image: File): Observable<{ message: string} > {
    const fd = new FormData()

    if (image) {
      fd.append('image', image, image.name)
    }
    if(service.name){
      fd.append('name', service.name)
    }
    if(service.phone){
      fd.append('phone', service.phone)
    }
    if(service.type){
      fd.append('type', service.type)
    }
    if(service.web){
      fd.append('web', service.web)
    }
    if(service.address){
      fd.append('address', service.address)
    }

    return this.http.patch<{message: string}>(`/api/services/${service._id}`, fd)
  }

  delete(id: string): Observable<Message> {
    return this.http.delete<Message>(`/api/services/${id}`)
  }
}
