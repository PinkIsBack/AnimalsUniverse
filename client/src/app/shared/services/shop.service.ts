import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../interfaces";


@Injectable({
  providedIn: 'root'
})

export class ShopService {

  constructor(private http: HttpClient) {}

  featch(params: any = {}): Observable<Product[]> {
    return this.http.get<Product[]>('/api/shop', {
      params: new HttpParams({
        fromObject: params
      })
    })
  }

  create(product: Product,image: File ): Observable<{ message: string }> {
    const fd = new FormData()

    if(image){
      fd.append('image', image , image.name)
    }

    fd.append('Price', product.Price.toString())
    fd.append('Name', product.Name)
    fd.append('Animal', product.Animal)
    fd.append('Category', product.Category)
    fd.append('Description', product.Description)
    fd.append('Manufacture', product.Manufacture)

    return this.http.post<{ message: string }>('api/shop', fd)
  }

  update(product: Product, image: File, productId:string): Observable<Product> {
    const fd = new FormData()

    if(image){
      fd.append('image', image , image.name)
    }
    fd.append('Price', product.Price.toString())
    fd.append('Name', product.Name)
    fd.append('Animal', product.Animal)
    fd.append('Category', product.Category)
    fd.append('Description', product.Description)
    fd.append('Manufacture', product.Manufacture)

    return this.http.patch<Product>('api/shop/'+productId, fd)
  }

  delete(productId: string) {
    return this.http.delete('api/shop/'+productId)
  }

  getById(id: string) :Observable<Product> {
    return this.http.get<Product>(`api/shop/${id}`)
  }
}
