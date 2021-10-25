import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Post } from "../interfaces";

@Injectable({
  providedIn: 'root'
})

export class PostService {

  constructor(private http: HttpClient) {}

  featch(params: any = {}): Observable<Post[]> {
      return this.http.get<Post[]>('/api/posts', {
        params: new HttpParams({
          fromObject: params
        })
      })
  }
  getByUser(userId: string):Observable<Post[]> {
    return this.http.get<Post[]>(`/api/posts/${userId}`)
  }
  getById(id: string) :Observable<Post> {
    return this.http.get<Post>(`api/posts/m/${id}`)
  }
  create(post: Post,  image: File): Observable<{message:string}> {
    const fd = new FormData()

    if(image){
      fd.append('image', image , image.name)
    }
    if(post.Price){
      fd.append('Price', post.Price.toString())
    }
    fd.append('Name', post.Name)
    fd.append('Age', post.Age.toString())
    fd.append('Animal', post.Animal)
    fd.append('Gender', post.Gender)
    fd.append('Description', post.Description)
    fd.append('City', post.City)
    fd.append('Action', post.Action)

    return this.http.post<{message:string}>('/api/posts',fd)
  }
  update(id: String, post: Post, image: File): Observable<Post> {
    const fd = new FormData()

    if(image){
      fd.append('image', image , image.name)
    }
    if(post.Price){
      fd.append('Price', post.Price.toString())
    }
    if(post.Name){
      fd.append('Name', post.Name)
    }
    if(post.Age){
      fd.append('Age', post.Age.toString())
    }
    if(post.Animal){
      fd.append('Animal', post.Animal)
    }
    if(post.Gender){
      fd.append('Gender', post.Gender)
    }
    if(post.Description){
      fd.append('Description', post.Description)
    }
    if(post.City){
      fd.append('City', post.City)
    }
    if(post.Action){
      fd.append('Action', post.Action)
    }

    return this.http.patch<Post>(`/api/posts/${id}`, fd)
  }
  delete(id: String): Observable<Post> {
    return this.http.delete<Post>(`/api/posts/${id}`)
  }
}
