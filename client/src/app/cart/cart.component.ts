import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnackBar } from '../shared/classes/snack-bar.service';
import { Order } from '../shared/interfaces';
import { OrderServise } from '../shared/services/order.service';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  pending: boolean = false
  order

  constructor(private orderService: OrderServise,
              private snack: SnackBar,
              private cart: CartService,
              private route: Router) { }

  ngOnInit(): void {
    this.order = this.cart
  }

  increase(quantity){
    return quantity++
  }

  decrease(quantity){
    return quantity--
  }

  removePosition(orderPosition){
    this.order.remove(orderPosition)
  }
  cancel(){
    this.order = []
    this.route.navigateByUrl('shop')
  }

  submit(){
    this.pending = true

    const order: Order = {
      list: this.order.list.map( item => {
        delete item._id
        return item
      }),
      price: this.cart.computePrice()
  }
    this.orderService.create(order).subscribe(
      newOrder => {
        this.snack.openSnackBar(`Your Order №${newOrder.order} was created`)
        this.cart.clear()
      },
      error => this.snack.showError(error),
      () => {
        this.pending = false
      }
    )

  }
}
