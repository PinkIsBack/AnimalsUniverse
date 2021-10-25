import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {Post, User} from '../interfaces'



@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient){}

  fetch(userId: String): Observable<User> {
    return this.http.get<User>(`/api/profile/${userId}`)
  }

  update(userId: String, user: User, image: File ): Observable<any> {
    const fd = new FormData()

    if(image){
      fd.append('image', image , image.name)
    }
    if(user.userName){
      fd.append('userName',  user.userName)
    }
    if(user.email){
      fd.append('email',  user.email)
    }
    if(user.phone){
      fd.append('phone', user.phone.toString())
    }
    if(user.description){
      fd.append('description', user.description)
    }
    if(user.city){
      fd.append('city', user.city)
    }
    if(user.status){
      fd.append('status', user.status.toString())
    }

    return this.http.patch<any>(`/api/profile/${userId}`, fd)
  }

  addToWhish(userId: String, post: Post) :Observable<any>{
    return this.http.patch<any>(`/api/profile/whish/${userId}`, post)
  }
  remove(id){
    return this.http.delete(`/api/profile/${id}`)
  }



}
