import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CartService } from '../cart/cart.service';
import { Product, Statistics } from '../shared/interfaces';
import { ShopService } from '../shared/services/shop.service';
import { StatisticsService } from '../shared/services/statistics.service';

const STEP = 8
//class for comparing data coming with the search form
export class sshop{
  type:any=[{name:"food",ch:false},{name:"toys",ch:false},{name:"clothes",ch:false} ]
  animal:any=[{name:"Dog",ch:false},{name:"Cat",ch:false},{name:"Others",ch:false}]
  statistic:Statistics

  constructor(Food:boolean, Toys:boolean, Clothes:boolean, Dog:boolean, Cat:boolean, Others:boolean){
    if(Food==true){this.type[0].ch=true}
    if(Toys==true){this.type[1].ch=true}
    if(Clothes==true){this.type[2].ch=true}
    if(Dog==true){this.animal[0].ch=true}
    if(Cat==true){this.animal[1].ch=true}
    if(Others==true){this.animal[2].ch=true}
  }
}
//-----------------------------------------------------------

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit, OnDestroy {


  constructor(private shopService: ShopService,
              private cart: CartService,
              private stat: StatisticsService) { }

    offset = 0
    limit = STEP

    oSub: Subscription

    prod:sshop
    products: Product[] = []
    Productslist:Product[] = []

    form:FormGroup

    userId = localStorage.getItem('userId')

    tmp:number
    chNum:number=0

    loading: boolean = false
    noMoreProducts: boolean = false
    reloading: boolean = false

  ngOnInit(): void {
    this.reloading = true
    this.fetch()
    this.show()
    this.form = new FormGroup({
      dog : new FormControl(0,Validators.required),
      cat : new FormControl(0, Validators.required),
      others : new FormControl(0, Validators.required),
      food : new FormControl(0, Validators.required),
      toys : new FormControl(0, Validators.required),
      clothes : new FormControl(0, Validators.required),
      })
    }

  add(product){
    this.prod = new sshop(product.value.food, product.value.toys, product.value.clothes, product.value.dog, product.value.cat, product.value.others)
    this.chNum = 0
    if(this.prod.type[0].ch==true || this.prod.type[1].ch==true || this.prod.type[2].ch==true){ this.chNum+=100; }
    if(this.prod.animal[0].ch==true || this.prod.animal[1].ch==true || this.prod.animal[2].ch==true) { this.chNum+=10 }
    this.Productslist=[]
    if(this.chNum!=0){
      this.shopService.featch().subscribe( products => {
            this.products = products
            this.loading = false
            this.reloading = false
            this.noMoreProducts = true
            this.show()
          })
    }
    else{
      this.show()
    }
    this.stat.editInfo(this.form.value,this.userId).subscribe()
  }

  buy(product: Product){
    this.cart.add(product)
  }

  show(){
        if(this.chNum==0){ this.Productslist=this.products; }
        if(this.chNum==10){
           for(let i of this.products){
              for(let y of this.prod.animal){
                if(i.Animal==y.name && y.ch==true){
                  this.Productslist.push(i)
                }
              }
            }
          }
        if(this.chNum==100){
          for(let i of this.products){
            for(let y of this.prod.type){
              if(i.Category==y.name && y.ch==true){
                this.Productslist.push(i)
              }
            }
          }
         }
        if(this.chNum==110){  //---------------------
          for(let i of this.products){
            for(let y of this.prod.type){
              for(let h of this.prod.animal)
              if((i.Animal==h.name && h.ch==true) && (i.Category==y.name && y.ch==true)){
                this.Productslist.push(i)
              }
            }
          }
        }
  }

  private fetch(){
    const params = Object.assign( {}, {
      offset: this.offset,
      limit: this.limit
    })
    this.oSub = this.shopService.featch(params).subscribe( products => {
      this.Productslist = this.Productslist.concat(products)
      this.products = this.products.concat(products)
      this.noMoreProducts = products.length < STEP
      this.loading = false
      this.reloading = false
    })
  }

  loadMore() {
    this.offset += STEP
    this.loading = true
    this.fetch()
  }

  ngOnDestroy(){
    this.oSub.unsubscribe()
  }
}
