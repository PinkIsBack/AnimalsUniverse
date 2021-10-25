import { Injectable } from "@angular/core";
import { OrderProduct, Product } from "../shared/interfaces";



@Injectable({
  providedIn:'root'
})
export class CartService {

  list:OrderProduct[] = []
  price = 0

  constructor() {}

  add(product: Product) {
    const orderProduct = Object.assign({}, {
      name: product.Name,
      cost: product.Price,
      quantity: product.Quantity? product.Quantity : 1,
      _id: product._id
    })
    const candidate = this.list.find(p => p._id === product._id)

    if(candidate){
     candidate.quantity += orderProduct.quantity
    }else{
      this.list.push(orderProduct)
    }
    this.computePrice()
  }

  public computePrice(): number{
    return this.price = this.list.reduce((total, item) => {
      return total += item.quantity * item.cost;
    }, 0);
  }

  remove(product: Product) {
    const idx = this.list.findIndex( p => p._id === product._id)
    this.list.splice(idx , 1)
    this.computePrice()
  }

  clear() {
    this.list =  []
    this.price = 0
  }

}
