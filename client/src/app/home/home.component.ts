import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CartService } from '../cart/cart.service';
import { SnackBar } from '../shared/classes/snack-bar.service';
import { Product, Statistics } from '../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';
import { ShopService } from '../shared/services/shop.service';
import { StatisticsService } from '../shared/services/statistics.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private router: Router,
    private route: ActivatedRoute,
    private snack: SnackBar,
    private Statistic: StatisticsService,
    private Shop: ShopService,
    private auth:AuthService,
    private cart: CartService
  ) { }
  idUser = localStorage.getItem('userId')
  loading:boolean = false
  inside:boolean = false
// variables for banner function
  animal:string
  type:string

  product:Product
  shop: Product[] = []
  stat: Statistics

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        this.snack.openSnackBar('Now you can autorize in system')
      } else if (params['accessDenied']) {
        this.snack.openSnackBar("First you must authorize in system")
      } else if (params['sessionFailed']) {
        this.snack.openSnackBar('Please autorize in system')
        localStorage.clear()
      }
    })
    this.Shop.featch().subscribe(
      data => {
        this.shop = data
      }
    )
    this.loading = true
    this.inside = this.auth.isAuthenticated()
    if(this.inside){
    this.Statistic.getById(this.idUser).subscribe(
      data => {
        this.stat = data[0]
        this.banner()
        this.loading = false
      }
    )
    }
  }
  toAboutPage() {
    this.router.navigateByUrl("about");
  }
  banner(){
    if(this.stat.cat>this.stat.dog){ this.animal='Cat' }
    else if(this.stat.cat<this.stat.dog){ this.animal='Dog' }
    else{ this.animal='Cat' }

    if(this.stat.food>this.stat.toys){ this.type='food' }
    else if(this.stat.toys>this.stat.food){ this.type='toys' }
    else{ this.type='clothes' }
    for(let p of this.shop){
      if(p.Animal==this.animal && p.Category==this.type){
        this.product=p
      }
    }
  }
  addToCart(product){
    this.cart.add(product)
    this.router.navigateByUrl('cart')
  }
}
