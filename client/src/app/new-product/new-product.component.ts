import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBar } from '../shared/classes/snack-bar.service';


import {  ElementRef,  ViewChild } from '@angular/core';
import { Params } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Product, Service } from "../shared/interfaces";
import { FormControl, Validators } from '@angular/forms';
import { ShopService } from '../shared/services/shop.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  @ViewChild('input') inputRef: ElementRef
  form: FormGroup
  isNew: boolean = true
  imagePreview
  image: File
  shop:Product
  shopId:string

  constructor(private route: ActivatedRoute,
    private router: Router,
    private snack: SnackBar,
    private shopS:ShopService) { }


    ngOnInit(): void {


      this.form = new FormGroup({
        Animal: new FormControl(null, Validators.required),
        Name: new FormControl(null, Validators.required),
        Price: new FormControl(null, Validators.required),
        Category: new FormControl(null, Validators.required),
        Description: new FormControl(null, Validators.required)
      })

      this.route.params
        .pipe(
          switchMap(
            (params: Params) => {
              if (params['id']!='newProduct') {
                this.isNew = false
                this.shopId = params['id']
                return this.shopS.getById(params['id'])
              }
              return of(null)
            }
          )
        )
        .subscribe(
          (shop: Product) => {
            if (shop) {
              this.shop = shop[0]
              this.form.patchValue({
                Name: shop[0].Name,
                Animal: shop[0].Animal,
                Price: shop[0].Price,
                Description: shop[0].Description,
                Category: shop[0].Category,
              })
              this.imagePreview = shop[0].ImgUrl
            }
          }
        )
    }

    onSubmit() {
      this.form.disable()
      this.shopS.create(this.form.value, this.image).subscribe(
        (data) => {
          this.snack.openSnackBar(data.message)
          this.router.navigate(["control"])
        }
      )
    }

    update(){
      this.shopS.update(this.shop, this.image, this.shopId).subscribe()
    }

    triggerClick() {
      this.inputRef.nativeElement.click()
    }

    onFileUpload(event: any) {
      const file = event.target.files[0]
      this.image = file

      const reader = new FileReader()

      reader.onload = () => {
        this.imagePreview = reader.result
      }

      reader.readAsDataURL(file)
    }
}
